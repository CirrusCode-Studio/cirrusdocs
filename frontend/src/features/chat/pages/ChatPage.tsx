'use client'
import TopBar from "../components/ui/TopBar";
import { KnowledgeBase } from "../types";
import { useState, useRef, useEffect } from "react";
import { Message, AppStatus } from "../types";
import { generateDocGroundedResponse } from "../services/gemini.service";
import ChatArea from "../components/ChatArea";
import InputArea from "../components/InputArea";

const ChatPage = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState<AppStatus>(AppStatus.READY);
    const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBase>({
        documentCount: 15, // Demo state: 15 docs ready
        status: 'active'
    });
    
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, status]);

    const handleSend = async (text: string = inputValue) => {
        if (!text.trim() || status === AppStatus.THINKING || knowledgeBase.documentCount === 0) return;

        const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: text,
        timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setStatus(AppStatus.THINKING);

        try {
        const response = await generateDocGroundedResponse(text, messages);
        const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: response.content,
            sources: response.sources,
            timestamp: Date.now()
        };
        setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
        console.error(error);
        } finally {
        setStatus(AppStatus.READY);
        }
    };

    const isBlocked = knowledgeBase.documentCount === 0;

    return (
    <div className="w-full mx-auto space-y-8">
        <TopBar documentCount={knowledgeBase.documentCount} status={knowledgeBase.status}/>
        
        {/* Main Chat Area */}
        <ChatArea messages={messages} status={status} chatEndRef={chatEndRef} handleSend={handleSend}/>
     
        {/* Floating Input Area */}
        <InputArea inputValue={inputValue} setInputValue={setInputValue} handleSend={handleSend} status={status} isBlocked={isBlocked}/>
    </div>
    )
}

export default ChatPage;