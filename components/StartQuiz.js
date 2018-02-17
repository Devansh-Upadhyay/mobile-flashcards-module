import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { white, yellow, gray, darkGray, red, green } from '../utils/colors';

class StartQuiz extends Component{
	state = {
		questions: [],
		activeIndex: 0,
		correctAnswers: 0,
		showAnswer: false,
		endQuiz: false
	}

	static navigationOptions = ({ navigation }) => {
		const { title } = navigation.state.params
		return {
			title: title
		}
	}

	countAnswer = (increment) => {
		let { activeIndex, questions, correctAnswers } = this.state

		if ((activeIndex+1) >= questions.length){
			return this.setState({
				correctAnswers: correctAnswers + increment,
				endQuiz: true
			})
		}

		this.setState({	
			activeIndex:  activeIndex + 1,
			correctAnswers: correctAnswers + increment,
			showAnswer: false
		})
	}

	showAnswer = () => {
		this.setState({showAnswer: true})
	}

	restartQuiz = () => {
		this.setState({
			activeIndex: 0,
			correctAnswers: 0,
			showAnswer: false,
			endQuiz: false
		})
	}

	componentDidMount(){
		const { title, questions } = this.props.navigation.state.params
		this.setState({title: title, questions: questions});
	}

	render(){
		const { title, questions } = this.props.navigation.state.params
		const { activeIndex, showAnswer, endQuiz, correctAnswers } = this.state

		if(endQuiz){
			return(
                <View style={[styles.container]}>
					<View style={styles.center}>
						<Text style={styles.textCentral}>Congrats! Quiz has finished, your score was: {correctAnswers}/{questions.length}</Text>
						<TouchableOpacity style={[styles.btn, styles.mainBtn]}
							onPress={this.restartQuiz}
						>
						<Text style={styles.textBtn}>Restart quiz</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.btn, styles.mainBtn]} 
						/* onPress={() => this.props.navigation.goBack(
							'DeckDetail',
							{ title: title}
						)} */
							onPress={() => this.props.navigation.goBack()}
						>
							<Text style={styles.textBtn}>Back to Deck</Text>
						</TouchableOpacity>
					</View>
                </View>
            )
		}

		if(showAnswer){
            return(
                <View style={[styles.container]}>
                    <Text> {activeIndex+1} / {questions.length} </Text>
					<View style={styles.center}>
						<Text style={styles.textCentral}>{questions[activeIndex].answer}</Text>
						<TouchableOpacity style={[styles.btn, styles.correctBtn]}
							onPress={() => this.countAnswer(1)}
						>
						<Text style={styles.textBtn}>Correct</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.btn, styles.wrongBtn]}
							onPress={() => this.countAnswer(0)}
						>
						<Text style={styles.textBtn}>Incorrect</Text>
						</TouchableOpacity>
					</View>
                </View>
            )
        }


		return (
			<View style={[styles.container]}>
				<Text style={styles.textIndex}> {activeIndex+1} / {questions.length} </Text>
				<View style={styles.center}>
					<Text style={styles.textCentral} >{questions[activeIndex].question}</Text>
					<TouchableOpacity
						onPress={this.showAnswer}
					>
					<Text style={{color: red, fontSize: 15}}>Answer</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
    	flex: 1,
		backgroundColor: white,
	},
	center: {
		justifyContent:'center',
		alignItems: 'center',
		flex: 1
	},
	textCentral: {
		fontSize: 40,
		alignSelf: 'center'
	},
    textIndex: {
    	color: darkGray,
		fontSize: 15,
		alignSelf: 'flex-start'
    },
    btn: {
    	marginTop: 10,
    	marginBottom: 10,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',
        alignSelf: 'center',
		alignItems: 'center',
		width: 150,
	},
	mainBtn: {
		backgroundColor: yellow,
		borderWidth: 1,
		borderColor: yellow,
	},
	correctBtn: {
		backgroundColor: green,
	},
	wrongBtn: {
		backgroundColor: red,		
	},
	textBtn:{
		fontWeight: 'bold',
		color: white
	},
    disabledBtn: {
    	marginTop: 10,
    	marginBottom: 10,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        borderWidth: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: gray
    },
})


export default StartQuiz