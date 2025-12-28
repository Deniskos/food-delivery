import { useState } from 'react';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import Label from './components/Label/Label';
import { MouseEvent } from 'react';

function App() {
	const [counter, setCounter] = useState<number>(0);

	const addCounter = (e: MouseEvent<HTMLElement>) => {
		console.log(e);
	};

	return (
		<>
			<Button onClick={addCounter}>Кнопка</Button>
      			<Button onClick={addCounter} size='big'>Кнопка</Button>

			<Label for="email">Ваш email</Label>
			<Input type='email' id='email' isValid={true} placeholder='Email' />
		</>
	);
}

export default App;
