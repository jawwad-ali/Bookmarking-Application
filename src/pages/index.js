import React from "react"
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css"
import Header from "../component/header"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

const BOOKMARK_QUERY = gql`{
    bookmark{
      id
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

  if (loading)
    return <h4>loading...</h4>

  if (error)
    return <h4>Error :(</h4>

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-12">
            <div className="form-container">
              <input type="text" ref={node => titleField = node} className="form-control half-width" placeholder="Title" />

              <br />
              <input type="text" ref={node => urlField = node} className="form-control half-width" placeholder="URL" />

              <div className="full-width mt-2 submit-btn-div">
                <button onClick={addBookmarkSubmit} className="btn btn-primary" >Add Bookmark</button>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* FAUNADB DATA */}

      <div className="container main-container">
        <div className="row">
          {data.bookmark.map((bm) => {
            return (
              <div key={bm.id} className="col-lg-4 offset-lg-1 mt-3 mr-1 data-container">
                <div className="icon-span" >
                  <FontAwesomeIcon className="icon" icon={faBookmark} />
                </div>

                <div className="inner-data-div">
                  <div className="title-div">
                    <p className="title" key={bm.id}>{bm.title} </p>
                  </div>
                  <div className="url-div">
                    <a className="url" href={bm.url}>{bm.url}</a>
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

{/* {data.bookmark.map((bm) => {
        return (
          <div>
            <p key={bm.id}>
              {bm.title}
            </p>
            <p>
              {
                bm.url
              }
            </p>
          </div>
        )
      })} */}