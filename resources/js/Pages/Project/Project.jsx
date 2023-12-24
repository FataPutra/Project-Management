import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Project({ auth, project, card, member, jobs }) {

    const [detailProject, setDetailProject] = useState(project);
    const [cards, setCard] = useState(card);

    const {data, setData, processing, errors, progress} = useForm({
        project_id : project.project_id,
        title : null,
        description : null,
        job : null,
        image : null,
    })

    const handleCreateCard = (e) => {
        // e.preventDefault();
        console.log(data);
        router.post(route('project.card.createCard'),data,{
            forceFormData : true,
        });
    }
    // console.log(project.project_id)

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={detailProject.name_project}
            member={member}
        >
            <Head title={`Project `+detailProject.name_project} />

            <div className='p-3 flex flex-col gap-2 bg-orange-50 overflow-hidden'>
                {/*  */}
                <button className="btn w-36 bg-gray-400 text-white" onClick={()=>document.getElementById('my_modal_card').showModal()}>Add Card</button>
                <dialog id="my_modal_card" className="modal">
                    <div className="modal-box bg-gray-400">
                        <h3 className="font-bold text-2xl text-center mb-4 text-white">Tambah Card Baru!</h3>
                        {/* <p className="py-4">Press ESC key or click outside to close</p> */}
                        <form onSubmit={handleCreateCard} className='flex flex-col gap-4 '>

                            <div className='flex flex-col justify-around w-full gap-1'>
                                <label id='title' className='font-bold text-white'>Title</label>
                                <input type="text" placeholder="Type title here" className="input input-bordered w-full max-w-xs" onChange={e => setData('title',e.target.value)}/>
                                {errors.title && <div>{errors.title}</div>}
                            </div>

                            <div className='flex flex-col justify-around w-full gap-1'>
                                <label id='description' className='font-bold text-white'>Description</label>
                                <textarea placeholder="Bio" className="textarea textarea-bordered w-full" onChange={e => setData('description', e.target.value)}></textarea>
                                {errors.description && <div>{errors.description}</div>}
                            </div>

                            <div className='flex flex-col justify-around w-full gap-1'>
                                <label id='job' className='font-bold text-white'>Job Access</label>
                                <select className="select select-bordered w-full max-w-xs" onChange={e => setData('job', e.target.value)}>
                                    <option disabled selected>Who shot first?</option>
                                    {jobs.map((job,index) => (
                                        <option key={index} value={job.job_id}>{job.name_job}</option>
                                    ))}
                                    {/* <option value={'Greedo'}>Greedo</option> */}
                                </select>
                                {errors.job && <div>{errors.job}</div>}
                            </div>

                            <div className='flex flex-col justify-around w-full gap-1'>
                                <label id='image' className='font-bold text-white'>image</label>
                                <input type="file" accept=".png, .jpg, .jpeg" className="file-input file-input-bordered w-full max-w-xs" onChange={e => setData('image', e.target.files[0])}/>
                                {progress && (
                                    <progress value={progress.percentage} max="100">
                                        {progress.percentage}%
                                    </progress>
                                )}
                                {/* <input type="text" placeholder="Type image here" className="input input-bordered w-full max-w-xs" onChange={e => setData('image',e.target.value)}/> */}
                                {errors.image && <div>{errors.image}</div>}
                            </div>

                            <button type="submit" disabled={processing} className='btn border-indigo-950 bg-indigo-950 text-white'>Add Card</button>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>

                {/* Card */}
                <div className='flex flex-wrap gap-2 '>
                    {cards.map((card, index) => (
                        <div className="card w-96 bg-base-100 shadow-xl" key={index}>
                            <div className="card-body">
                                <h2 className="card-title">{card.title}</h2>
                                {/* <p>{card.description}</p> */}
                                <div className="card-actions justify-center">
                                    <button className="btn btn-primary">View Detail</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </AuthenticatedLayout>
    );
}
