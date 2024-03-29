export const wait =(time)=>{
    return new Promise(resolve=>setTimeout(resolve,time))
}

export const POSTS=[
    {
        id:1,title:"Post 1"
    },
    {
        id:2,title:"Post 2"
    }
]

/**
 query --> Getting data from somewhere
 mutation --> Changing sometype of data
 */