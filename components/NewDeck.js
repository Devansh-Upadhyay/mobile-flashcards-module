import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { saveDeckTitle, clearStorage, getDecks } from '../utils/api';
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

class NewDeck extends Component{
	state = {
        title: ''
    }

    toNewDeck = (title) => {
        //this.props.navigation.dispatch(NavigationActions.navigate('DeckDetail', { title: title}))
        this.props.navigation.navigate('DeckDetail', { title: title})
    }

    toHome = (title) => {
        this.props.navigation.dispatch(NavigationActions.back({key: 'NewDeck'}))
        //this.props.navigation.navigate('DeckDetail', { title: title})
    }

    clearStorage = () => {
    	clearStorage();
    	
        //Navigate to Home
        this.toHome();
    }

    submit = () => {
        const { title } = this.state;

        //Update redux
        this.props.dispatch(addDeck({
            [title]: {
            	title: title,
    			questions: []	
            }
        }));

        //Clear state
        this.setState(()=> ({
            title: ''
        }));
        
        //Save to DB
        saveDeckTitle(title).then(()=>{
            //After save db
            //Navigate to new Deck
            this.toNewDeck(title);
        });

       
    }
	
	render(){
		return(
			<View style={styles.container}> 
				<Text style={styles.textInfo}>What is the title of your new deck? </Text>
				<TextInput
		 	        style={styles.textInput}
		 	        onChangeText={(title) => this.setState({title})}
		 	        value={this.state.title}
			 	/>
			 	<SubmitBtn onPress={this.submit} /> 		

			 	<TouchableOpacity
		            style={styles.submitBtn }
		            onPress={this.clearStorage}> 
		            <Text style={styles.submitBtnText}>CLEAR STORAGE</Text>
		        </TouchableOpacity>	
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
)(NewDeck)
