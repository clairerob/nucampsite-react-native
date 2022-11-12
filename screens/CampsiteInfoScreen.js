import { useState } from 'react';
import { FlatList, StyleSheet, Text, View, Button, Modal } from 'react-native';
import RenderCampsite from '../features/campsites/RenderCampsite';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { Input, Rating, Icon } from 'react-native-elements';
import { postComment } from '../features/comments/commentsSlice';

const CampsiteInfoScreen = ({ route }) => {
	const { campsite } = route.params;
	const comments = useSelector((state) => state.comments);
	const favorites = useSelector((state) => state.favorites);
	const dispatch = useDispatch();

	const [showModal, setShowModal] = useState(false);

	const [author, setAuthor] = useState('');
	const [rating, setRating] = useState(5);
	const [text, setText] = useState('');

	const handleSubmit = () => {
		const newComment = {
			author,
			rating,
			text,
			campsiteId: campsite.id,
		};
		dispatch(postComment(newComment));
		setShowModal(!showModal);
	};

	const resetForm = () => {
		setAuthor('');
		setRating(5);
		setText('');
	};

	const renderCommentItem = ({ item }) => {
		return (
			<View style={styles.commentItem}>
				<Text style={{ fontSize: 14 }}>{item.text}</Text>
				<Rating
					read-only
					startingValue={item.rating}
					imageSize={10}
					style={{ alignItems: 'flex-start', paddingVertical: '5%' }}
				/>
				<Text style={{ fontSize: 12 }}>
					{`-- ${item.author}, ${item.date}`}
				</Text>
			</View>
		);
	};

	return (
		<>
			<FlatList
				data={comments.commentsArray.filter(
					(comment) => comment.campsiteId === campsite.id
				)}
				renderItem={renderCommentItem}
				keyExtractor={(item) => item.id.toString()}
				contentContainerStyle={{
					marginHorizontal: 20,
					paddingVertical: 20,
				}}
				ListHeaderComponent={
					<>
						<RenderCampsite
							campsite={campsite}
							isFavorite={favorites.includes(campsite.id)}
							markFavorite={() => dispatch(toggleFavorite(campsite.id))}
							onShowModal={() => setShowModal(!showModal)}
						/>
						<Text style={styles.commentsTitle}>Comments</Text>
					</>
				}
			/>
			<Modal
				animationType='slide'
				transparent={false}
				visible={showModal}
				onRequestClose={() => setShowModal(!showModal)}
			>
				<View style={styles.modal}>
					<Rating
						showRating
						startingValue={rating}
						imageSize={40}
						onFinishRating={(rating) => setRating(rating)}
						style={{ paddingVertical: 10 }}
					/>
					<Input
						placeholder='Author'
						leftIcon={<Icon name='user-o' type='font-awesome' />}
						leftIconContainerStyle={{ paddingRight: 10 }}
						onChangeText={(value) => setAuthor(value)}
						value={author}
					/>
					<Input
						placeholder='Comment'
						leftIcon={<Icon name='comment-o' type='font-awesome' />}
						leftIconContainerStyle={{ paddingRight: 10 }}
						onChangeText={(value) => setText(value)}
						value={text}
					/>
					<View style={{ margin: 10 }}>
						<Button
							title='Submit'
							color='#5637DD'
							onPress={() => {
								handleSubmit();
								resetForm();
							}}
						/>
					</View>
					<View style={{ margin: 10 }}>
						<Button
							onPress={() => {
								setShowModal(!showModal);
								resetForm();
							}}
							color='#808080'
							title='Cancel'
						/>
					</View>
				</View>
			</Modal>
		</>
	);
};

const styles = StyleSheet.create({
	commentsTitle: {
		textAlign: 'center',
		backgroundColor: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
		color: '#43484D',
		padding: 10,
		paddingTop: 30,
	},
	commentItem: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: '#fff',
	},
	modal: {
		justifyContent: 'center',
		margin: 20,
	},
});

export default CampsiteInfoScreen;
