import React from "react"
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const BOOKMARK_QUERY = gql`{
    bookmark{
      title
      url
    }

}`

const ADD_BOOKMARK_MUTATION = gql`
  mutation addBookmark($title:String! , $url:String!){
    addBookmark(title:$title , url:$url){
      title
      url
    }
  }
`

export default function Home() {

  const { loading, data, error } = useQuery(BOOKMARK_QUERY)
  console.log(data)

  let titleField
  let urlField

  // MUTATION QUERY 
  const [addBookmark] = useMutation(ADD_BOOKMARK_MUTATION)

  // onSubmit function
  const addBookmarkSubmit = () => {

    addBookmark({
      variables: {
        title: titleField.value,
        url: urlField.value
      },
      refetchQueries: [{ query: BOOKMARK_QUERY }]
    })

    console.log(titleField.value, urlField.value)
    titleField.value = ""
    urlField.value = ""
  }

  return (
    <div>
      <div>
        <label>
          Enter Bookmark Tite: <br />
          <input type="text" ref={node => titleField = node} />
        </label>

        <br />
        <label>
          Enter Bookmark Url: <br />
          <input type="text" ref={node => urlField = node} />
        </label>

        <br />
        <br />
        <button onClick={addBookmarkSubmit} >Add Bookmark</button>
      </div>
      {
        JSON.stringify(data)
      }
    </div>
  )
}
