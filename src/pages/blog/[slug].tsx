import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';

import BackButton from '@/common/components/elements/BackButton';
import Container from '@/common/components/elements/Container';
import { formatExcerpt } from '@/common/helpers';
import { BlogDetailProps, MediumPost } from '@/common/types/blog';
import BlogDetail from '@/modules/blog/components/BlogDetail';
import { getBlogDetail } from '@/services/blog';
import { getMediumBlogDetail } from '@/services/medium';

const GiscusComment = dynamic(
  () => import('@/modules/blog/components/GiscusComment'),
);

interface BlogDetailPageProps {
  blog: {
    data: MediumPost;
  };
}

const BlogDetailPage: NextPage<BlogDetailPageProps> = ({ blog }) => {
  const blogData: MediumPost = blog?.data;

  const urlWithoutQuery = blogData?.link.split('?')[0];
  const origSlug = urlWithoutQuery?.split('/').pop();
  const id = urlWithoutQuery?.split('-').pop();

  const slug = `blog/${origSlug}?id=${id}`;
  const canonicalUrl = `https://aulianza.id/${slug}`;
  // const description = formatExcerpt(blogData?.excerpt?.rendered);

  // const incrementViews = async () => {
  //   await axios.post(`/api/views?&slug=${blogData?.slug}`);
  // };

  // useEffect(() => {
  //   if (process.env.NODE_ENV === 'production') {
  //     incrementViews();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      <NextSeo
        title={`${blogData?.title} - Blog Kyle Dominic Mendoza`}
        description={'Medium Blog'}
        canonical={canonicalUrl}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: blogData?.pubDate,
            modifiedTime: blogData?.pubDate,
            authors: ['Kyle Dominic Mendoza'],
          },
          url: canonicalUrl,
          images: [
            {
              url: '/images/blog-placeholder.png',
            },
          ],
          siteName: 'Kyle Dominic Mendoza blog',
        }}
      />
      <Container data-aos='fade-up'>
        <BackButton url='/blog' />
        <BlogDetail {...blogData} />
        <section id='comments'>
          <GiscusComment isEnableReaction={false} />
        </section>
      </Container>
    </>
  );
};

export default BlogDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const blogId = context.query?.id as string;

  if (!blogId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const response = await getMediumBlogDetail(blogId);

  if (response?.status === 500) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      blog: response,
    },
  };
};
