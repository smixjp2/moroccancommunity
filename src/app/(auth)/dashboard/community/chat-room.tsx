
'use client';

import { useState, useEffect, useRef } from 'react';
import { useFirestore } from '@/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, getDoc, doc, Timestamp, limit } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Loader2, UserCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ChatRoomProps {
  room: {
    id: string;
    name: string;
  };
  user: User | null;
}

interface Message {
  id: string;
  text: string;
  userId: string;
  userName: string;
  createdAt: Timestamp;
}

export default function ChatRoom({ room, user }: ChatRoomProps) {
  const firestore = useFirestore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!firestore || !room.id) return;

    setLoading(true);
    const messagesColRef = collection(firestore, `chatRooms/${room.id}/messages`);
    const q = query(messagesColRef, orderBy('createdAt', 'asc'), limit(50));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
      setMessages(msgs);
      setLoading(false);
    }, (error) => {
        console.error("Erreur lors de la récupération des messages: ", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore, room.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !user || !firestore) return;
    
    // Get user's first name from their profile
    const userDocRef = doc(firestore, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);
    const userName = userDocSnap.exists() ? userDocSnap.data().firstName : 'Anonyme';

    const messagesColRef = collection(firestore, `chatRooms/${room.id}/messages`);
    const messageData = {
      text: newMessage,
      userId: user.uid,
      userName: userName,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(messagesColRef, messageData);
      setNewMessage('');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message: ', error);
    }
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-12rem)] md:h-[70vh]">
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : messages.length === 0 ? (
           <div className="flex items-center justify-center h-full text-muted-foreground">
             <p>Aucun message. Soyez le premier à engager la conversation !</p>
           </div>
        ) : (
          messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.userId === user?.uid ? 'justify-end' : ''}`}
            >
              {msg.userId !== user?.uid && (
                <Avatar className="h-8 w-8">
                    <AvatarFallback>
                        {msg.userName ? msg.userName.charAt(0).toUpperCase() : <UserCircle />}
                    </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                  msg.userId === user?.uid
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm font-bold">{msg.userName}</p>
                <p className="text-base">{msg.text}</p>
                <p className="text-xs opacity-70 mt-1 text-right">
                  {msg.createdAt?.toDate().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            disabled={!user}
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim() || !user}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
