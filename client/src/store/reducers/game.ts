import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFields, getSteps } from '../../api/api';

interface GameState { 
	player: object;
	field: object;
	isFields: boolean;
	gameFields: object;
	createGame: boolean;
	isStart: boolean;
	message: string;
	firstStep: string;
	isActive: boolean;
	steps: object;
	isFetching: boolean;
	isCanceled: boolean;
} 

interface StepsTS{
	id: string;
	gameId: number;
}

const initialState : GameState = {
	player: {},
	field: {},
	isFields: false,
	gameFields: {},
	createGame: false,
	isStart: false,
	message: '',
	firstStep: '',
	isActive: false,
	steps: {},
	isFetching: false,
	isCanceled: false,
};

export const fetchGameFields  = createAsyncThunk('game/fetchGameFields', async ({id, gameId}: StepsTS ) => {
	const field = await getFields(gameId);
	const steps = await getSteps(gameId, id);
	return {field, steps};
});

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		createGame: (state, action) => {
			state.player = action.payload;
			state.createGame = true;
		},
		leaveGame: (state) => {
			state.createGame = false;		
			state.isStart =false;
			state.player = {};
			state.field= {};
			state.gameFields = {};
			state.isFields = false;
			state.isActive = false;
			state.steps = {};
			state.isCanceled = true;
		},
		gameField: (state, action) => {
			
			state.field = action.payload.validField;
		 	state.isStart = action.payload.status;
			state.message = action.payload.message;
			state.firstStep = action.payload.firstStep;
		},
		setIsActive: (state, action) => {
			state.isActive = action.payload.isActive;
		},
		setGameData: (state, action) => {
			
				state.gameFields = {...action.payload.fields[0]};
				state.isFields = true;
				state.isStart = true;
				state.createGame = true;
			
				state.message = action.payload.message;

			if (action.payload.status){
				state.steps = action.payload.steps;
				state.isActive = action.payload.isActive;
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchGameFields.pending, (state, action)=> {

			state.isFetching = false;
		}); 
		builder.addCase(fetchGameFields.fulfilled, (state, action) => {
			state.isFetching = false;
			if (action.payload.field.status){
				state.gameFields = {...action.payload.field.fields[0]};
				state.isFields = true;
				state.isStart = true;
				state.createGame = true;
			} 
			state.message = action.payload.field.message;

			if (action.payload.steps.status){
				state.steps = action.payload.steps.steps;
				state.isActive = action.payload.steps.isActive;
			}
		});
	}
});


export const {createGame, gameField, leaveGame, setIsActive, setGameData} = gameSlice.actions;
export default gameSlice.reducer;