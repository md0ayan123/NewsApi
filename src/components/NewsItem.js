import React, { Component } from 'react'

export class NewsItem extends Component {
 
  
  render() {
    let {title, description , imageUrl , newsUrl }=this.props
    return (
      <div>
      <div className="card my-4" style={{border:"1px solid black" , }}>
           <img src={!imageUrl?"https://timesofindia.indiatimes.com/photo/msid-104403427,imgsize-69410.cms":imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a rel="noreferrer" href={newsUrl}target="_blank" className="btn btn-sm btn-dark">Read More</a>
          
      </div>
</div>
      </div>
    ) 
  }
}

export default NewsItem

