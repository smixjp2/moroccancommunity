"use client"

import { FormEvent, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CourseAccessCredential } from '@/lib/course-access';
import { Search, Trash2, PlusCircle, LogOut } from 'lucide-react';

interface CredentialManagerProps {
  credentials: CourseAccessCredential[];
}

export function CredentialManager({ credentials: initialCredentials }: CredentialManagerProps) {
  const [credentials, setCredentials] = useState(initialCredentials);
  const [search, setSearch] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState('');
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const filteredCredentials = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) {
      return credentials;
    }

    return credentials.filter((credential) =>
      credential.username.toLowerCase().includes(normalizedSearch) ||
      credential.code.toLowerCase().includes(normalizedSearch),
    );
  }, [credentials, search]);

  async function refreshCredentials() {
    const response = await fetch('/api/admin/credentials');
    if (!response.ok) {
      setErrorMessage('Impossible de charger les accès.');
      return;
    }

    const updated = await response.json();
    setCredentials(updated);
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage('');
    setStatusMessage('');
    setIsSaving(true);

    const response = await fetch('/api/admin/credentials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.trim(), code: code.trim() }),
    });

    setIsSaving(false);

    if (!response.ok) {
      setErrorMessage('Erreur lors de la sauvegarde de l’accès.');
      return;
    }

    const updated = await response.json();
    setCredentials(updated);
    setUsername('');
    setCode('');
    setStatusMessage('Accès enregistré avec succès.');
  }

  async function handleDelete(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage('');
    setStatusMessage('');
    setIsDeleting(true);

    const response = await fetch('/api/admin/credentials', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: selectedUsername }),
    });

    setIsDeleting(false);
    setConfirmOpen(false);

    if (!response.ok) {
      setErrorMessage('Erreur lors de la suppression de l’accès.');
      return;
    }

    const updated = await response.json();
    setCredentials(updated);
    setSelectedUsername('');
    setStatusMessage('Accès supprimé avec succès.');
  }

  async function handleLogout() {
    setIsLoggingOut(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.reload();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Gestion des accès</h2>
          <p className="text-sm text-slate-600">Ajoutez, modifiez ou supprimez des accès cours en toute sécurité.</p>
        </div>
        <Button variant="secondary" size="sm" onClick={handleLogout} disabled={isLoggingOut}>
          <LogOut className="mr-2 h-4 w-4" />
          {isLoggingOut ? 'Déconnexion...' : 'Déconnexion'}
        </Button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
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
                      <Button
                        variant="destructive"
                        size="sm"
                        type="button"
                        className="inline-flex items-center gap-2"
                        onClick={() => {
                          setSelectedUsername(credential.username);
                          setConfirmOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        Supprimer
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ajouter / Mettre à jour</CardTitle>
            <CardDescription>Créez un nouvel accès ou mettez à jour le code existant.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSave}>
              <div className="space-y-2">
                <Label htmlFor="username">Nom d’utilisateur</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="e.g. mariam123"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Code d’accès</Label>
                <Input
                  id="code"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  placeholder="e.g. ABC123"
                  required
                />
              </div>
              {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
              {statusMessage ? <p className="text-sm text-success">{statusMessage}</p> : null}
              <Button type="submit" className="w-full" disabled={isSaving}>
                <PlusCircle className="mr-2 h-4 w-4" />
                {isSaving ? 'Enregistrement...' : 'Enregistrer l’accès'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmation de suppression</DialogTitle>
            <DialogDescription>
              Voulez-vous vraiment supprimer l’accès pour <strong>{selectedUsername}</strong>? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleDelete} className="space-y-4">
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setConfirmOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" variant="destructive" disabled={isDeleting}>
                {isDeleting ? 'Suppression...' : 'Supprimer'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
