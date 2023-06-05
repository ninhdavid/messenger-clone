'use client';
import Button from '@/app/components/Button';
import Modal from '@/app/components/Modal';
import Input from '@/app/components/inputs/Input';
import { User } from '@prisma/client';
import axios from 'axios';
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { FieldValues, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

interface SettingsModalProps {
	currentUser: User;
	isOpen?: boolean;
	onClose: () => void;
}

// eslint-disable-next-line no-empty-pattern
const SettingsModal: FC<SettingsModalProps> = ({ currentUser, isOpen, onClose }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: currentUser?.name,
			image: currentUser?.image,
		},
	});
	const image = watch('image');

	const handleUpload = (results: any) => {
		setValue('image', results?.info?.secure_url, { shouldValidate: true });
	};

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		axios
			.post('/api/settings', data)
			.then(() => {
				router.refresh();
				onClose();
			})
			.catch(() => toast.error('Something went wrong!'))
			.finally(() => setIsLoading(false));
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='space-y-12'>
					<div className='border-b border-gray-900/10 pb-12'>
						<h2 className='text-base font-semibold leading-7 text-gray-900'>Profile</h2>
						<p className='mt-1 text-sm leading-6 text-gray-600'>
							Edit your public information
						</p>
						<div className='mt-10 flex flex-col gap-y-8'>
							<Input
								disabled
								label='Name'
								id='name'
								errors={errors}
								register={register}
								required
							/>
							<div>
								<label className='block text-sm font-medium leading-6 text-gray-900'>
									Photo
								</label>
								<div className='mt-2 flex items-center gap-x-3'>
									<Image
										width='48'
										height='48'
										className='rounded-full'
										src={
											image || currentUser?.image || '/images/placeholder.jpg'
										}
										alt='Avatar'
									></Image>
									<CldUploadButton
										options={{ maxFiles: 1 }}
										uploadPreset='shfo8leb'
										onUpload={handleUpload}
									>
										<Button disabled={isLoading} secondary type='button'>
											Change
										</Button>
									</CldUploadButton>
								</div>
							</div>
						</div>
					</div>
					<div className='mt-6 flex items-center justify-end gap-x-6'>
						<Button disabled={isLoading} secondary onClick={onClose}>
							Cancel
						</Button>
						<Button disabled={isLoading} type='submit'>
							Save
						</Button>
					</div>
				</div>
			</form>
		</Modal>
	);
};

export default SettingsModal;