import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'




export class News extends Component {
  static defaultProps ={
    country:"in",
    pageSize:5  ,
    category:"sports"
  }
  static propTypes ={
    country:PropTypes.string,
    page:PropTypes.number,
    category:PropTypes.string,
  }
  
   
    constructor(){
        super();
        console.log("Hello i am a constructor from News component");
        this.state = {
          articles: [],
          loading: false,
          page:1
        
        }
      }
        async componentDidMount(){
       
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7bae9f8b1d384f6c8affcb1489116ba1&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles ,
                   totalResults:parsedData.totalResults,
                        loading:false})
      }
         
      handlePrevClick=async()=>{
          console.log("Previous");
          let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=7bae9f8b1d384f6c8affcb1489116ba1&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
          this.setState({loading:true});
          let data = await fetch(url);
          let parsedData = await data.json();     
          console.log(parsedData);  
          this.setState({
            page:this.state.page-1,
            articles: parsedData.articles,
            loading:false
          })
          
        }
        handleNextClick=async()=>{
          console.log("Next");
          if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
                        
          let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7bae9f8b1d384f6c8affcb1489116ba1&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
          this.setState({loading:true});
          let data = await fetch(url);
          let parsedData = await data.json();
          console.log(parsedData);
          this.setState({
            page:this.state.page + 1,
            articles: parsedData.articles,
            loading:false
            
          })
         
      }}
      

  render() {
    console.log("render");
    return (
      <div className="container my-3 ">

        <h1 className='text-center' style={{margin:"44px 0px"}}> NewsDonkey - Top Headline</h1>
      {this.state.loading && <Spinner/>}
    
        <div className="row">
            {! this.state.loading && this.state.articles?.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                </div>   })} 
          <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1}type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button  disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next  &rarr;</button>
          </div>
            </div>
      
      </div>
    )
  }
}

export default News
