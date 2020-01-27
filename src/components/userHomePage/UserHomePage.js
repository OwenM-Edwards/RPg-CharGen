import React from 'react';
import HomePageListItem from './HomePageListItem';

   /*
   title - your submissions

   list, submission, type, moderation status, reason

   once clicked on a submission there should be a drop down
   the dropdown should have an edit and a delete button.
   */

class UserHomePage extends React.Component {
   constructor(props){
      super(props); 
      this.state = {
         returnedSubHumanName:'',
         returnedSubOrcName:'',

         returnedSubHumanLastName:'',
         returnedSubOrcLastName:'',

         returnedSubHumanImg:'',
         returnedSubOrcImg:'',

         returnedSubRoleplay:'',
         returnedSubOrcIntrigue:'',

         SubmissionArr:'',
         displayList:false
      }
      this.getSubmissions();
      this.props.changeSubTitle('Your Submissions');
   }

   getSubmissions = () => {
      fetch('https://safe-dawn-37731.herokuapp.com/getsubmissions', {
         method: 'post',
         headers: {'Content-Type' : 'application/json'},
         body: JSON.stringify({
            email: this.props.user.email
         })
      })
      .then(response => response.json())
      .then(res => {
         this.setState({returnedSubHumanName:res[0]})
         this.setState({returnedSubOrcName:res[1]})

         this.setState({returnedSubHumanImg:res[2]})
         this.setState({returnedSubOrcImg:res[3]})

         this.setState({returnedSubHumanLastName:res[4]})
         this.setState({returnedSubOrcLastName:res[5]})

         this.setState({returnedSubRoleplay:res[6]})
         this.setState({returnedSubIntrigue:res[7]})


         this.sortSubmissionArrNames();
         this.sortSubmissionArrLastNames();
         this.sortSubmissionArrImages();
         this.sortSubmissionArrDesc();
         this.setState({displayList:true})

      })

      .catch(err=>{
         console.log(err);
         
      })
   }

   
   sortSubmissionArrNames=()=>{
      let SubmissionArr = []
      SubmissionArr.push('First Names');
      this.state.returnedSubHumanName.forEach(element=>{
         SubmissionArr.push(element);
      })
      this.state.returnedSubOrcName.forEach(element=>{
         SubmissionArr.push(element);
      })
      this.setState({SubmissionArr:SubmissionArr});
   } 
   sortSubmissionArrLastNames=()=>{
      this.state.SubmissionArr.push('Last Names');
      this.state.returnedSubHumanLastName.forEach(element=>{
         this.state.SubmissionArr.push(element);
      })
      this.state.returnedSubOrcLastName.forEach(element=>{
         this.state.SubmissionArr.push(element);
      })
   } 
   sortSubmissionArrImages=()=>{
      this.state.SubmissionArr.push('Images');
      this.state.returnedSubHumanImg.forEach(element=>{
         this.state.SubmissionArr.push(element);
      })
      this.state.returnedSubOrcImg.forEach(element=>{
         this.state.SubmissionArr.push(element);
      })
   } 
   sortSubmissionArrDesc=()=>{
      this.state.SubmissionArr.push('Roleplay Cues');
      this.state.returnedSubRoleplay.forEach(element=>{
         this.state.SubmissionArr.push(element);
      })
      this.state.SubmissionArr.push('Intrigues');
      this.state.returnedSubIntrigue.forEach(element=>{
         this.state.SubmissionArr.push(element);
      })
   } 



   getSubmissionArrDisplay= () =>{
      let SubmissionDisplayList = [];
      let keyCounter = 0;
      this.state.SubmissionArr.forEach(element=>{
         SubmissionDisplayList.push(<HomePageListItem key={keyCounter} items={element}/>);
         keyCounter++
      })
      return SubmissionDisplayList
   }


   render() {

      let displayListStatus = '';
      if(this.state.displayList === true){
         displayListStatus =this.getSubmissionArrDisplay()
      }
      return (
         <div className="userListContainer">
            {displayListStatus}
         </div>
      );
   } 
}

export default UserHomePage;