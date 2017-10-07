/* eslint-disable arrow-parens */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable */

// NODE MODULES
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Checkbox, Container, Form, Header } from 'semantic-ui-react';

// LOCAL MODULES
import { fetchDefinitionsForLevelThunk } from '../../store/words';


/**
 * STYLES
 */
const styles = {
  container: {
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  definitions: {
    // marginTop: "100px",
  },
  navContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    padding: "0em 3em",
    marginTop: "80px",
  },
  nav: {
    margin: "0",
  },
  score: {
    marginTop: "4em",
  }
}


/**
 * COMPONENT
 */
class Definitions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correct: 0,
      total: 10,
      lives: 3,
      choice: '',
    };

    this.handleChangeOption = this.handleChangeOption.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
  }

  componentDidMount() {
    console.log('this.state.seed = ', this.state.seed)
    let level = this.props.userLevel < 7 ? 7 : this.props.userLevel + 1;
    // this.props.fetchDefinitionsForLevel(level);
  }

  handleChangeOption(e, option){
    console.log("option.value = ", option.value);
    this.setState({ choice: option.value })

    // this.setState({ option: option.value })
    // this.choice = option.value;
  }

  handleSubmit(e, form){
    // console.log("e.target.value = ", e.target.checkboxRadioGroup[i])
    for(let i = 0; i < e.target.checkboxRadioGroup.length; i++) {
      if(e.target.checkboxRadioGroup[i].value === form["data-word"]) {
        console.log('WINNER!!!')
      }
      // console.log("form.data-word = ", form["data-word"]);
    }
  }

  handleClickPrev(e) {
    // this.setState({ option: e.target.value })
    console.log("PREV");
    
  }

  handleClickNext(e) {
    // this.setState({ option: e.target.value })
    console.log("NEXT");
  }

  render() {
    // let { option, correct, total } = this.state;
    let { correct, total } = this.state;
    let selectedOption = '';
    let { definitions } = this.props;
    
    if(Object.keys(definitions).length) {
      let index = Math.floor(Math.random() * definitions.length);
      let selected = definitions[index];
      let options = [];
      
      while(options.length < 4) {
        let index = Math.floor(Math.random() * definitions.length);
        let newOption = definitions[index];
        
        if(options.indexOf(newOption.word) === -1  && newOption.word !== selected.word) {
          options.push(newOption);
        }
      }

      let randomIndex = Math.floor(Math.random() * 4);
      options[randomIndex] = selected;

      return (
        <Container style={styles.container}>
          <Header as="h2" style={styles.score}>Score: {correct}/{total} </Header>
          <Header as="h1">Match the correct word to the definition:</Header>
          <Header as="h3" data-word={selected.word}>Definition: {selected.meaning}</Header>
          <Form data-word={selected.word} onSubmit={this.handleSubmit}>
            {
              options.map( option => {
                return (
                  <Form.Field key={option.id}>
                    <Checkbox
                      radio
                      label={option.word}
                      name="checkboxRadioGroup"
                      value={option.word}
                      checked={ this.state.choice === option.word }
                      onChange={ this.handleChangeOption }
                    />
                  </Form.Field>
                )
              })
            }
            <Form.Button>Submit</Form.Button>
          </Form>
          <div style={styles.navContainer}>
            <h3 style={styles.nav} onClick={this.handleClickPrev}>PREV</h3>
            <h3 style={styles.nav} onClick={this.handleClickNext}>NEXT</h3>
          </div>
        </Container>
      );
    } else {
      return <div></div>
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    userLevel: state.userLevel,
    definitions: state.words.definitions,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDefinitionsForLevel(userLevel) {
      dispatch(fetchDefinitionsForLevelThunk(userLevel));
    }, 
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Definitions));


// // NODE MODULES
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import Chance from 'chance';
// import { Checkbox, Container, Dimmer, Form, Header, Loader, Progress } from 'semantic-ui-react';

// // LOCAL MODULES
// import { fetchDefinitionsForLevelThunk } from '../../store/words';


// /**
//  * STYLES
//  */
// const styles = {
//   container: {
//     margin: "auto",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "column",
//   },
//   definitions: {
//     // marginTop: "100px",
//   },
//   form: {
//     width: "37em",
//   },
//   navContainer: {
//     width: "100%",
//     display: "flex",
//     justifyContent: "space-between",
//     padding: "0em 3em",
//     marginTop: "80px",
//   },
//   nav: {
//     margin: "0",
//   },
//   score: {
//     marginTop: "4em",
//   }
// }


// /**
//  * COMPONENT
//  */
// class Definitions extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       correct: 0,
//       total: 10,
//       lives: 3,
//       choice: '',
//     };

//     this.handleChangeOption = this.handleChangeOption.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   componentDidMount() {
//     let level = this.props.userLevel < 7 ? 7 : this.props.userLevel + 1;
//     this.props.fetchDefinitionsForLevel(level);
//   }

//   handleChangeOption(e, option){
//     this.setState({ choice: option.value });
//   }

//   handleSubmit(e, form){    
//     if(this.state.choice === form["data-word"]) console.log( "WINNER!!!" )
//     else console.log("YOU LOSE :-(")
//   }

//   render() {
//     // const seed = this.props.match.params.seed;
//     // const chance = new Chance(seed);

//     // const { definitions } = this.props;
//     // let { correct, total } = this.state;
    
//     // if(Object.keys(definitions).length) {

//     //   let index = chance.natural({ min: 0, max: definitions.length - 1 });
//     //   let selected = definitions[index];
        
//     //   options = [];    
//     //   while(options.length < 4) {
//     //     let index = chance.natural({ min: 0, max: definitions.length - 1 });      
//     //     let newOption = definitions[index];
  
//     //     console.log('newOption = ', newOption)
        
//     //     if(options.indexOf(newOption.word) === -1  && newOption.word !== selected.word) {
//     //       options.push(newOption);
//     //     }
//     //   }
    
//     //   /** Now we place the correct word in a random index in our options array **/ 
//     //   let randomIndex = chance.natural({ min: 0, max: options.length - 1 });
//     //   options[randomIndex] = selected;
  
//     //   let quiz = [];

//     //   // while(quiz.length < 10) {
//     //   //   let index = chance.natural({ min: 0, max: definitions.length - 1 });
//     //   //   let selected = definitions[index];

//     //   //   let questionIncluded = quiz.filter( question => question.word === selected.word)
        
//     //   //   if(!questionIncluded) {
//     //   //     let newQuestion = createQuestion(selected);
//     //   //     quiz.push(newQuestion);
//     //   //   }
//     //   // }

//     //   return (
//     //     <Container className="definitions-container" style={styles.container}>
//     //       <Header as="h2" style={styles.score}>Score: {correct}/{total} </Header>
//     //       <Progress percent={40} size='tiny' color="purple" />
//     //       <Header as="h1">Match the correct word to the definition:</Header>
//     //       <Header as="h3" data-word={selected.word}>Definition: {selected.meaning}</Header>
//     //       <Form style={styles.form} data-word={selected.word} onSubmit={this.handleSubmit}>
//     //         {
//     //           options.map( option => {
//     //             return (
//     //               <Form.Field key={option.id}>
//     //                 <Checkbox
//     //                   radio
//     //                   label={option.word}
//     //                   name="checkboxRadioGroup"
//     //                   value={option.word}
//     //                   checked={ this.state.choice === option.word }
//     //                   onChange={ this.handleChangeOption }
//     //                 />
//     //               </Form.Field>
//     //             )
//     //           })
//     //         }
//     //         <div style={styles.navContainer}>
//     //           <Form.Button style={styles.nav}>Skip</Form.Button>
//     //           <Form.Button style={styles.nav}>Submit</Form.Button>
//     //         </div>
//     //       </Form>
//     //     </Container>
//     //   );
//     // } else {
//     //   return(
//     //     <Dimmer active>
//     //       <Loader size='massive'>Loading</Loader>
//     //     </Dimmer>
//     //   )
//     // }
//     return <div>Hello World!</div>
//   }
// }

// const mapStateToProps = state => {
//   return {
//     user: state.user,
//     userLevel: state.userLevel,
//     definitions: state.words.definitions,
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchDefinitionsForLevel(userLevel) {
//       dispatch(fetchDefinitionsForLevelThunk(userLevel));
//     }, 
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Definitions);
