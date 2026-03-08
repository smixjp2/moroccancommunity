
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, getDocs, doc, getDoc, query, where, orderBy, limit } from 'firebase/firestore';
import type { UserCourse } from '@/lib/types';
import { Loader2, Users, MessageSquare } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ALL_COURSES } from '@/lib/course-data';
import ChatRoom from './chat-room';

interface ChatRoomInfo {
  id: string;
  name: string;
  description: string;
  lastMessage?: string;
  lastMessageTimestamp?: Date;
}

export default function CommunityPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [userCourses, setUserCourses] = useState<UserCourse[]>([]);
  const [chatRooms, setChatRooms] = useState<ChatRoomInfo[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoomInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user's courses
  useEffect(() => {
    if (user && firestore) {
      const fetchUserCourses = async () => {
        setLoading(true);
        const userCoursesColRef = collection(firestore, `users/${user.uid}/userCourses`);
        const snapshot = await getDocs(userCoursesColRef);
        const courses = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as UserCourse));
        setUserCourses(courses);
      };
      fetchUserCourses();
    }
  }, [user, firestore]);

  // Fetch chat room info based on user's courses
  useEffect(() => {
    if (firestore && userCourses.length > 0) {
      const fetchChatRooms = async () => {
        const roomPromises = userCourses.map(async (course) => {
          const courseDetails = ALL_COURSES.find(c => c.id === course.courseId);
          if (!courseDetails) return null;

          const roomInfo: ChatRoomInfo = {
            id: course.courseId,
            name: `Communauté: ${courseDetails.title}`,
            description: `Salon de discussion pour la formation ${courseDetails.title}`,
          };
          
          return roomInfo;
        });

        const resolvedRooms = (await Promise.all(roomPromises)).filter(Boolean) as ChatRoomInfo[];
        setChatRooms(resolvedRooms);
        setLoading(false);
      };
      fetchChatRooms();
    } else if (!isUserLoading) {
      setLoading(false);
    }
  }, [userCourses, firestore, isUserLoading]);


  if (loading || isUserLoading) {
    return (
      <div className="flex h-full min-h-[calc(100vh-10rem)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-12">
        <header className="mb-8 max-w-3xl">
            <h1 className="text-4xl font-bold font-headline flex items-center gap-3"><Users className="text-primary" />Espace Communautaire</h1>
            <p className="text-muted-foreground mt-2">
            Échangez avec les autres membres, posez des questions et partagez vos connaissances dans les salons dédiés à vos formations.
            </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Rooms List */}
            <div className="md:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Vos Salons</CardTitle>
                        <CardDescription>Cliquez sur un salon pour discuter.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                         {chatRooms.length > 0 ? (
                            chatRooms.map(room => (
                                <button
                                    key={room.id}
                                    onClick={() => setSelectedRoom(room)}
                                    className={`w-full text-left p-3 rounded-lg transition-colors ${selectedRoom?.id === room.id ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                                >
                                    <p className="font-semibold flex items-center gap-2"><MessageSquare className="h-4 w-4"/> {room.name}</p>
                                    <p className="text-xs text-muted-foreground pl-6">{room.description}</p>
                                </button>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground text-center py-4">Vous n'avez accès à aucun salon. Achetez une formation pour rejoindre une communauté !</p>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Chat Area */}
            <div className="md:col-span-2">
                {selectedRoom ? (
                    <ChatRoom room={selectedRoom} user={user} />
                ) : (
                    <Card className="flex flex-col items-center justify-center min-h-[60vh]">
                        <Users className="h-16 w-16 text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold">Bienvenue dans la communauté</h3>
                        <p className="text-muted-foreground">Sélectionnez un salon pour commencer à discuter.</p>
                    </Card>
                )}
            </div>
        </div>
    </div>
  );
}
