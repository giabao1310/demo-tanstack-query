import React, { useEffect, useRef } from 'react';
import useGetPost from '../hook/getPost';

const PostList: React.FC = () => {
    const { data, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetPost();
    const observerElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        }, {
            threshold: 1
        });

        if (observerElement.current) {
            observer.observe(observerElement.current);
        }

        return () => {
            if (observerElement.current) {
                observer.unobserve(observerElement.current);
            }
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {data?.pages.map((page, i) => (
                    <React.Fragment key={i}>
                        {page.map((post: any) => (
                            <li key={post.id}>
                                <h3>{post.title}</h3>
                                <p>{post.body}</p>
                            </li>
                        ))}
                    </React.Fragment>
                ))}
            </ul>
            <div ref={observerElement} />
            {isFetchingNextPage && <div>Loading more...</div>}
        </div>
    );
};

export default PostList;