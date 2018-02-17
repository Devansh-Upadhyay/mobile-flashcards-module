import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { addCardToDeck } from '../utils/api';
import { connect } from 'react-redux';
import { receiveDecks, addDeck } from '../actions';
import { white, yellow, lightGray } from '../utils/colors';
import { NavigationActions } from 'react-navigation';

function SubmitBtn({ onPress }){
    return (
        <TouchableOpacity
            style={styles.submitBtn }
            onPress={onPress}> 
            <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
    )
}

class AddCard extends Component{
	state = {
        question: '',
        answer: ''
    }

    static navigationOptions = () => {
        return {
            title: 'Add Card'
        }
    }

    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    submit = () => {
        const { title } = this.props.navigation.state.params;
        const { refreshCards } = this.props.navigation.state.params;

        const card = {
            question: this.state.question,
            answer: this.state.answer
        }

        //Update redux
       //  this.props.dispatch(addDeck({
       //       [title]: {
       //       	title: title,
    			// questions: []	
       //       }
       //  }));

        //Clear state
        this.setState(()=> ({
            question: '',
            answer: ''
        }));

        //Save to DB
        addCardToDeck({title, card})
            .then(() => { 
                //Navigate to Home
                this.toHome();   

                //refreshCards from Deck
                refreshCards();
            });
    }
	
	render(){
		return(
			<View style={styles.container}> 
				<Text style={styles.textInfo}>Write your question:</Text>
				<TextInput
		 	        style={styles.textInput}
		 	        onChangeText={(question) => this.setState({question})}
		 	        value={this.state.question}
			 	/>
                <Text style={styles.textInfo}>Write the answer:</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(answer) => this.setState({answer})}
                    value={this.state.answer}
                />
			 	<SubmitBtn onPress={this.submit} /> 			
			</View>
		)
	}
}


const styles = {
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    textInfo: { 
    	fontSize: 25,
    	alignSelf: 'center'
    },
    textInput: {
    	borderWidth: 1,
    	borderColor: lightGray,
    	borderRadius: 10,
    	width: '100%'
    },
    submitBtn: {
        backgroundColor: yellow,
        marginTop: 20,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'center',
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30
    }
}

function mapStateToProps (state) {
  return {}
}

export default connect(
  mapStateToProps
)(AddCard)
