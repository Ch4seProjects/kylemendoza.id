import Parser from 'rss-parser';
import { MediumFeed, MediumPost } from '@/common/types/blog';

const parser = new Parser<MediumFeed>();

const BASE_URL = 'https://medium.com/feed/';
const USERNAME = '@kylemendoza67';

export const getMediumBlogList = async () => {
  try {
    const feed: MediumFeed = await parser.parseURL(`${BASE_URL}${USERNAME}`);

    const items: MediumPost[] = feed.items ?? [];

    return {
      status: 200,
      data: {
        feeds: items,
      },
    };
  } catch (error) {
    console.error('[getMediumBlogList] Failed to fetch Medium feed:', error);

    return {
      status: 500,
      data: {
        feeds: [] as MediumPost[],
      },
      error: 'Failed to fetch Medium feed',
    };
  }
};
