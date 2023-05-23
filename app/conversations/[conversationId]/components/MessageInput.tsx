import type { FC } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface MessageInputProps {
	id: string;
	placeholder?: string;
	type?: string;
	required?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldValues;
}

// eslint-disable-next-line no-empty-pattern
const MessageInput: FC<MessageInputProps> = ({
	id,
	placeholder,
	type,
	register,
	required,
	errors,
}) => {
	return (
		<div className='relative w-full'>
			<input
				id={id}
				type={type}
				autoComplete={id}
				{...register(id, { required })}
				placeholder={placeholder}
				className='text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full  focus:outline-none'
			/>
		</div>
	);
};

export default MessageInput;
