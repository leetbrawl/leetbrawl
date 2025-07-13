const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface CreateMatchRequest {
  problemId?: string;
  isPublic?: boolean;
}

export interface JoinMatchRequest {
  matchId: string;
}

export interface Match {
  id: string;
  status: 'waiting' | 'active' | 'completed';
  problemId: string;
  createdAt: string;
  players: string[];
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  testCases: TestCase[];
}

export interface TestCase {
  input: string;
  output: string;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  async createMatch(data: CreateMatchRequest): Promise<Match> {
    return this.request<Match>('/api/matches', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async joinMatch(data: JoinMatchRequest): Promise<Match> {
    return this.request<Match>('/api/matches/join', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMatch(matchId: string): Promise<Match> {
    return this.request<Match>(`/api/matches/${matchId}`);
  }

  async getProblem(problemId: string): Promise<Problem> {
    return this.request<Problem>(`/api/problems/${problemId}`);
  }

  async getRandomProblem(): Promise<Problem> {
    return this.request<Problem>('/api/problems/random');
  }
}

export const apiClient = new ApiClient(); 