/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


export interface Video {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  views: string;
  duration: string;
  description: string;
}

export interface Topic {
  id: string;
  name: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
