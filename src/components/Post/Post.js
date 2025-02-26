import React , {useState, useEffect} from 'react';

function Post() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        fetch("/v1/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPostList(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if(error) {
        return <div>Error!: {error.message}</div>
    }else if (!isLoaded) {
        return <div>Loading...</div>
    }else {
        return (
            <ul>
                {postList.map(post => (
                    <li key={post.id}>
                        {post.title} {post.text}
                    </li>
                ))}
            </ul>
        )
    }     
}
export default Post;