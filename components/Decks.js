import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getDecks } from '../utils/api';
import  DeckDetail from './DeckDetail';
import { receiveDecks } from '../actions';
import { AppLoading } from 'expo';
import { NavigationActions } from 'react-navigation';
import { white, yellow, gray, lightGray } from '../utils/colors';

class Decks extends Component{
	state = {
		ready: false,
	}

	renderItem = ({ item }) => {
		const {title, questions} = {...item}
		return (
			<View> 
				<TouchableOpacity onPress={() => this.props.navigation.navigate(
					'DeckDetail',
					{ title: title}
				)}>
					<Text style={styles.deckText}>{title}</Text>
					<Text style={styles.deckTextCounting}>{questions.length} cards</Text>
				</TouchableOpacity>
			</View>
		)
	}

	renderSeparator = () => {
	    return (
		      <View style={styles.itemSeparator} />
	    );
	}

	refreshDecks = () => {
		const { dispatch } = this.props
	    getDecks()
	      .then((decks) => dispatch(receiveDecks(decks)));
	}

	componentDidMount () {
			const { dispatch } = this.props
					
	    getDecks()
	      .then((decks) => dispatch(receiveDecks(decks)))
	      .then(() => this.setState(() => ({ready: true})))
	}

	render(){
		const { decks } = this.props
	    const { ready } = this.state

	    if (ready === false) {
	      return <AppLoading />
	    }

	    return (
	      <View style={styles.container}>
	      	{ decks !== null && Object.keys(decks).length !== 0
	      			?  <FlatList  
	      					data={Object.keys(decks).map(key => decks[key])} 
	      					renderItem={this.renderItem} 
	      					keyExtractor={item=> item.title}
	      					ItemSeparatorComponent={this.renderSeparator}
	      				/> 
	      			:   <View>
				        	<Text style={styles.noDataText}>We can't found decks in your app, wish add a new one?</Text>
				        	<TouchableOpacity style={styles.submitBtn}
					            onPress={() => this.props.navigation.navigate(
					              'NewDeck', { 
					              	refresh: this.refreshDecks 
					            })}
					          >
					          <Text style={styles.submitBtnText}>New Deck</Text>
					        </TouchableOpacity>
				        </View>
	      			} 
	      </View>
	    )
	}
}

const styles = StyleSheet.create({
  	noDataText: {
	  	color: gray,
	    fontSize: 15,
	    paddingLeft: 10,
	    paddingRight: 10,
	    paddingBottom: 20
  	},
  	submitBtn: {
        backgroundColor: yellow,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    container: {
    	flex: 1,
    	backgroundColor: white
    },
    deckText: {
    	fontSize: 25,
    	alignSelf: 'center'
    },
    deckTextCounting: {
    	fontSize: 20,
    	color: gray,
    	alignSelf: 'center'
    },
    itemSeparator: {
    	height: 2,
		backgroundColor: lightGray,
    	marginTop: 4,
    	marginBottom: 4,
    }
})

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(Decks)