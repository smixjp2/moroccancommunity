"use client"

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CourseAccessCredential } from '@/lib/course-access';
import { Search, Trash2, PlusCircle } from 'lucide-react';

interface CredentialManagerProps {
  credentials: CourseAccessCredential[];
  deleteAction: (formData: FormData) => Promise<void>;
}

export function CredentialManager({ credentials, deleteAction }: CredentialManagerProps) {
  const [search, setSearch] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState('');

  const filteredCredentials = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) {
      return credentials;
    }

    return credentials.filter((credential) =>
      credential.username.includes(normalizedSearch) || credential.code.includes(normalizedSearch),
    );
  }, [credentials, search]);

  function openDeleteDialog(username: string) {
    setSelectedUsername(username);
    setConfirmOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Filtrer par nom d'utilisateur ou code"
            className="pl-10"
          />
        </div>
        <div className="text-sm text-slate-500 self-end">
          {filteredCredentials.length} accès affichés
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des accès</CardTitle>
          <CardDescription>Recherchez et gérez facilement les identifiants d’accès aux cours.</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredCredentials.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucun accès ne correspond à cette recherche.</p>
          ) : (
            <div className="space-y-4">
              {filteredCredentials.map((credential) => (
                <div
                  key={credential.username}
                  className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="font-semibold">{credential.username}</p>
                    <p className="text-sm text-slate-600">Code : {credential.code}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      type="button"
                      className="inline-flex items-center gap-2"
                      onClick={() => openDeleteDialog(credential.username)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Supprimer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmation de suppression</DialogTitle>
            <DialogDescription>
              Voulez-vous vraiment supprimer l’accès pour <strong>{selectedUsername}</strong>? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <form action={deleteAction} className="space-y-4">
            <input type="hidden" name="username" value={selectedUsername} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setConfirmOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" variant="destructive">
                Supprimer
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
