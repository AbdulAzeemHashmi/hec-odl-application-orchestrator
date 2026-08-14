'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '../ui/Button'

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
}

interface ChatWidgetProps {
    applicationId?: string
}

export default function ChatWidget({ applicationId }: ChatWidgetProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Hello! I am your ODL application assistant. Ask me anything about the policy, your application status, or the scrutiny process.',
        },
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const sendMessage = async () => {
        if (!input.trim() || loading) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
        }
        setMessages((prev) => [...prev, userMessage])
        setInput('')
        setLoading(true)

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                    applicationId,
                }),
            })

            const data = await response.json()
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.response || data.error || 'Sorry, I could not process that request.',
            }
            setMessages((prev) => [...prev, assistantMessage])
        } catch (error: any) {
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: `Error: ${error.message}`,
                },
            ])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto space-y-4 p-2">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`p-3 rounded-lg max-w-[85%] ${msg.role === 'user'
                            ? 'ml-auto bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                            }`}
                    >
                        {msg.content}
                    </div>
                ))}
                {loading && (
                    <div className="p-3 rounded-lg bg-gray-100 text-gray-500 max-w-[85%]">
                        <span className="animate-pulse">▌</span> Thinking...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="border-t p-2 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about ODL policy..."
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    disabled={loading}
                />
                <Button onClick={sendMessage} disabled={loading} variant="default">
                    Send
                </Button>
            </div>
        </div>
    )
}