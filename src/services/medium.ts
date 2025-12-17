import Parser from 'rss-parser';
import { MediumFeed, MediumPost } from '@/common/types/blog';

const parser = new Parser<MediumFeed>();

const BASE_URL = 'https://medium.com/feed/';
const USERNAME = '@kylemendoza67';

interface MediumBlogDetailResponseProps {
  status: number;
  data: any;
}

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

export const getMediumBlogDetail = async (
  id: string,
): Promise<MediumBlogDetailResponseProps> => {
  try {
    const feed: MediumFeed = await parser.parseURL(`${BASE_URL}${USERNAME}`);

    const items: MediumPost[] = feed.items ?? [];
    const blogItem = items.find((item) => item.link.includes(id));

    return { status: 200, data: blogItem || null };
  } catch (error) {
    console.error('[getMediumBlogDetail] Failed to fetch Medium post:', error);

    return {
      status: 500,
      data: null,
    };
  }
};
