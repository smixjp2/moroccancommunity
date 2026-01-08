
'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFirestore } from '@/firebase';
import { doc, getDoc, collection, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { Loader2, User, GraduationCap, Save } from 'lucide-react';
import { ALL_COURSES } from '@/lib/course-data';
import type { UserProfile } from '@/app/(auth)/dashboard/page';
import type { UserCourse } from '@/lib/types';
import AdminAuthGuard from '@/app/components/admin-auth-guard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

interface ManageUserPageProps {
  params: { userId: string };
}

function ManageUserPage({ params }: ManageUserPageProps) {
  const { userId } = params;
  const firestore = useFirestore();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userCourses, setUserCourses] = useState<string[]>([]); // Array of courseId
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      courses: [] as string[],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch user profile
        const userDocRef = doc(firestore, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserProfile(userDocSnap.data() as UserProfile);
        }

        // Fetch user's current courses
        const userCoursesColRef = collection(firestore, `users/${userId}/userCourses`);
        const coursesSnapshot = await getDocs(userCoursesColRef);
        const currentCourseIds = coursesSnapshot.docs.map(doc => doc.id);
        setUserCourses(currentCourseIds);
        form.setValue('courses', currentCourseIds);
        
      } catch (error) {
        console.error("Error fetching user data:", error);
         toast({ variant: "destructive", title: "Erreur", description: "Impossible de charger les données de l'utilisateur." });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, firestore]);

  const onSubmit = async (data: { courses: string[] }) => {
     setLoading(true);
     try {
        const selectedCourses = new Set(data.courses);
        const currentCourses = new Set(userCourses);

        // Courses to add
        for (const courseId of selectedCourses) {
            if (!currentCourses.has(courseId)) {
                const courseData = ALL_COURSES.find(c => c.id === courseId);
                if (courseData) {
                    const userCourseDocRef = doc(firestore, `users/${userId}/userCourses`, courseId);
                    await setDoc(userCourseDocRef, {
                        courseId: courseData.id,
                        title: courseData.title,
                        description: courseData.description,
                        href: courseData.href,
                    });
                }
            }
        }

        // Courses to remove
        for (const courseId of currentCourses) {
            if (!selectedCourses.has(courseId)) {
                const userCourseDocRef = doc(firestore, `users/${userId}/userCourses`, courseId);
                await deleteDoc(userCourseDocRef);
            }
        }
        setUserCourses(data.courses);
        toast({ title: "Succès", description: "Les formations de l'utilisateur ont été mises à jour." });

     } catch (error) {
        console.error("Error updating user courses:", error);
        toast({ variant: "destructive", title: "Erreur", description: "Une erreur est survenue lors de la mise à jour." });
     } finally {
        setLoading(false);
     }
  };

  if (loading) {
    return <div className="flex h-full min-h-screen items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
  }

  if (!userProfile) {
    return <div className="container py-12 text-center">Utilisateur non trouvé. <Link href="/admin/users" className="underline">Retour à la liste</Link></div>;
  }

  return (
    <div className="container py-12">
        <header className="mb-8">
            <h1 className="text-3xl font-bold font-headline flex items-center gap-3"><User /> Gérer l'Utilisateur</h1>
            <p className="text-muted-foreground mt-2">
                Vous modifiez les accès pour : <span className="font-semibold text-primary">{userProfile.firstName} {userProfile.lastName}</span> ({userProfile.email})
            </p>
        </header>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><GraduationCap />Assigner des Formations</CardTitle>
                <CardDescription>Cochez les formations auxquelles cet utilisateur doit avoir accès.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {ALL_COURSES.map(course => (
                                <FormField
                                    key={course.id}
                                    control={form.control}
                                    name="courses"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50 transition-colors">
                                             <FormControl>
                                                <Checkbox
                                                    checked={field.value?.includes(course.id)}
                                                    onCheckedChange={(checked) => {
                                                        return checked
                                                        ? field.onChange([...field.value, course.id])
                                                        : field.onChange(
                                                            field.value?.filter(
                                                                (value) => value !== course.id
                                                            )
                                                            )
                                                    }}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>{course.title}</FormLabel>
                                                <p className="text-xs text-muted-foreground">{course.description}</p>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>
                         <div className="flex justify-end gap-4 mt-8">
                            <Button variant="outline" asChild>
                                <Link href="/admin/users">Annuler</Link>
                            </Button>
                            <Button type="submit" disabled={loading}>
                                <Save className="mr-2" />
                                {loading ? 'Sauvegarde...' : 'Enregistrer les Accès'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  );
}


export default function ProtectedManageUserPage(props: ManageUserPageProps) {
    return (
        <AdminAuthGuard>
            <ManageUserPage {...props} />
        </AdminAuthGuard>
    );
}