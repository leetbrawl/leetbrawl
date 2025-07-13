import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

export interface SocketEvents {
  // Client to Server
  'join-match': (data: { matchId: string; userId: string }) => void;
  'submit-solution': (data: { matchId: string; userId: string; code: string; language: string }) => void;
  'leave-match': (data: { matchId: string; userId: string }) => void;

  // Server to Client
  'match-joined': (data: { match: any; problem: any }) => void;
  'match-started': (data: { startTime: number; duration: number }) => void;
  'opponent-submitted': (data: { userId: string; timestamp: number }) => void;
  'verdict-received': (data: { userId: string; verdict: string; executionTime: number }) => void;
  'match-completed': (data: { winner: string; results: any[] }) => void;
  'error': (data: { message: string }) => void;
}

export class SocketClient {
  private socket: Socket | null = null;
  private isConnected = false;

  connect(userId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = io(SOCKET_URL, {
        auth: {
          userId,
        },
      });

      this.socket.on('connect', () => {
        this.isConnected = true;
        console.log('Connected to server');
        resolve();
      });

      this.socket.on('connect_error', (error: any) => {
        console.error('Connection error:', error);
        reject(error);
      });

      this.socket.on('disconnect', () => {
        this.isConnected = false;
        console.log('Disconnected from server');
      });
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  emit<T extends keyof SocketEvents>(event: T, data: Parameters<SocketEvents[T]>[0]): void {
    if (this.socket && this.isConnected) {
      this.socket.emit(event, data);
    } else {
      console.error('Socket not connected');
    }
  }

  on<T extends keyof SocketEvents>(event: T, callback: SocketEvents[T]): void {
    if (this.socket) {
      this.socket.on(event, callback as any);
    }
  }

  off<T extends keyof SocketEvents>(event: T, callback?: SocketEvents[T]): void {
    if (this.socket) {
      if (callback) {
        this.socket.off(event, callback as any);
      } else {
        this.socket.off(event);
      }
    }
  }

  get connected(): boolean {
    return this.isConnected;
  }
}

export const socketClient = new SocketClient(); 