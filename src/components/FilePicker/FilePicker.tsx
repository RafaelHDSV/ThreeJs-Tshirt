import CustomButton from '../CustomButton/CustomButton'

interface IFilePickerProps {
  file: File | undefined
  setFile: (file: File | undefined) => void
  readFile: (file: File, type: 'logo' | 'full') => void
}
export default function FilePicker({ file, setFile, readFile }: IFilePickerProps) {
  return (
    <div className='filepicker-container'>
      <div className='flex-1 flex flex-col'>
        <input id='file-upload' type='file' accept='image/*' onChange={e => setFile(e.target?.files ? e.target.files[0] : undefined)} />
        <label htmlFor='file-upload' className='filepicker-label'>
          Upload File
        </label>

        <p className='mt-2 text-gray-500 text-xs truncate'>{file?.name === '' ? 'No file selected' : file?.name}</p>
      </div>

      <div className='mt-4 flex flex-wrap gap-3'>
        <CustomButton type='outline' title='Logo' handleClick={() => file && readFile(file, 'logo')} customStyles='text-xs' />
        <CustomButton type='filled' title='Full' handleClick={() => file && readFile(file, 'full')} customStyles='text-xs' />
      </div>
    </div>
  )
}
