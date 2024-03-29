import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useRef } from 'react'
import { POSTS, wait } from './utils'

const App = () => {
  const inpRef=useRef(null);
  const queryClient = useQueryClient();
  const postsQuery = useQuery({
    queryKey:['posts'],
    queryFn:()=>wait(1000).then(()=>POSTS),
    // queryFn:()=> Promise.reject("Network Fails")
  })
  const postMutation = useMutation({
    mutationFn: (title)=>{
      return wait(1000).then(()=>POSTS.push({id:crypto.randomUUID(),title}))
    },
    onSuccess:()=>{ // Clearing / Invalidating old data in the post aka ['posts']
      queryClient.invalidateQueries(['posts'])
    }
  });

  const addNewPosts = ()=>{
    postMutation.mutate(inpRef.current.value)
    inpRef.current.value=""
  }
  
  if(postsQuery.isLoading) return <h1>Loading...</h1>
  if(postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>
  return (
    <section>
      <h4>Posts</h4>
      <ul>
        {
          postsQuery.data.map((eachPosts)=>(
            <li key={eachPosts.id}>{eachPosts.title}</li>
          ))
        }
      </ul>
      <hr/>
      <div style={{display:'flex', gap:"0.5rem", alignItems:'center'}}>
      <label>Add New Post </label>
      <input ref={inpRef} />
      <button onClick={addNewPosts} disabled={postMutation.isPending}> Add</button>
      </div>
    </section>
  )
}

export default App