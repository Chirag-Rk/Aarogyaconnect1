'use client';
import { useEffect, useState } from 'react';
import { collectionGroup, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface AudioTip {
  id: string;
  title: string;
  transcript: string;
  audioURL: string;
  createdAt: string;
}

export default function AudioTips() {
  const [audioTips, setAudioTips] = useState<AudioTip[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const snapshot = await getDocs(collectionGroup(db, 'audioHealthTips'));

        const tips: AudioTip[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          const createdAtRaw = data.createdAt;

          let createdAt = 'Unknown';
          if (createdAtRaw instanceof Date) {
            createdAt = createdAtRaw.toLocaleString();
          } else if (createdAtRaw?.toDate) {
            createdAt = createdAtRaw.toDate().toLocaleString();
          }

          return {
            id: doc.id,
            title: data.title ?? 'Untitled',
            transcript: data.transcript ?? 'No transcript available.',
            audioURL: data.audioURL ?? '',
            createdAt,
          };
        });

        // Sort tips by createdAt (latest first)
        tips.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        setAudioTips(tips);
      } catch (error) {
        console.error('❌ Error fetching audio tips:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  const filteredTips = audioTips.filter((tip) =>
    tip.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <Input
        placeholder="Search tips..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />

      {loading ? (
        <p className="text-muted-foreground">⏳ Loading audio tips...</p>
      ) : filteredTips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip) => (
            <Card key={tip.id}>
              <CardHeader>
                <CardTitle>{tip.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {tip.transcript.slice(0, 80)}...
                </p>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Posted:</strong> {tip.createdAt}</p>
                {tip.audioURL ? (
                  <audio controls className="w-full">
                    <source src={tip.audioURL} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                ) : (
                  <p className="text-red-500 text-sm">
                    ⚠️ No audio file available.<br />
                    <a href={tip.audioURL} className="underline text-blue-500" target="_blank" rel="noopener noreferrer">
                      Try download
                    </a>
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">🔍 No tips match your search.</p>
      )}
    </div>
  );
}

