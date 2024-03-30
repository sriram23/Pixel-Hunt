import { CheckCircleTwoTone, CloseCircleTwoTone, EnvironmentTwoTone } from '@ant-design/icons';
const ProfileCard = ({profile}) => {
    return (
        <div className='flex justify-center w-full h-full'>
            <div className='flex mt-6 mb-6 gap-4'>
            <div>
                <img className="rounded-full" src={profile.profile_image.large} alt="Profile image of user" />
            </div>
            <div>
                <h2 className='text-3xl'>{profile.name}</h2>
                <h3 className='text-xl text-slate-400'>@{profile.username}</h3>
                <p>{profile.bio}</p>
                <div className='flex gap-2 items-center'>
                    {profile.for_hire ? <CheckCircleTwoTone twoToneColor={'#3CB043'} /> : <CloseCircleTwoTone twoToneColor={'#D0312D'} />}
                    <p>{profile.for_hire ? 'Availabel for Hier' : 'Not Availabel for Hier'}</p>
                </div>
                {profile.location && <div className='flex gap-2 items-center'>
                    <EnvironmentTwoTone />
                    <p>{profile.location}</p>
                </div>}
                <div>
                    <h4 className='text-xl mt-2 mb-2'>Tags</h4>
                    <div className='flex gap-2'>
                        {profile.tags?.custom?.map(tag => <p className='border p-2' key={tag}>{tag.title}</p>)}
                    </div>
                </div>
                <div>
                    <h4 className='text-xl mt-2 mb-2'>Photos</h4>
                    <div className='flex gap-2 flex-wrap'>
                        {profile.photos.map(photo => (
                            <img src={photo.urls.small} alt={photo.slug} key={photo.id} />
                        ))}
                    </div>
                </div>
            </div>
            </div>
        </div>
        
    )
}

export default ProfileCard