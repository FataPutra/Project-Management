import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import axios from 'axios';
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
        router.post(route('project.card.createCard'),data,{
            forceFormData : true,
        });
        window.location.reload();
    }

    const handleDeleteCard = (card) => {
        axios.delete(route('project.card.delete',card.card_id))
            .then(res => {
                console.log(res.data)
                window.location.reload();
            })
    }

    const [description, setDescription] = useState(null);
    const [image, setImage] = useState(null);

    const decrypt = async (description, image) => {

        await axios.post(route('project.card.decrypt',{description, image}))
            .then(res => {
                setDescription(res.data.description);
                setImage(res.data.image);
            })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={detailProject.name_project}
            member={member}
            project={project}
            jobs = {jobs}
        >
            <Head title={`Project `+detailProject.name_project} />

            <div className='p-3 flex flex-col gap-2 bg-red-300'>
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
                                    <option disabled selected>Who Can Access?</option>
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
                                <div className="card-body relative">

                                    {/* DELETE CARD */}
                                    {/* <button className='absolute top-3 right-5 bg-red-500 p-2 rounded-lg' onClick={() => handleDeleteCard(card)}>

                                    </button> */}
                                    <button className="absolute top-3 right-5 bg-red-500 hover:bg-red-600 p-2 rounded-lg" onClick={()=>document.getElementById('modalDeleteCard_'+ card.card_id).showModal()}>
                                        <svg class="w-5 h-5 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                            <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"/>
                                        </svg>
                                    </button>
                                    <dialog id={'modalDeleteCard_'+ card.card_id} className="modal">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg">Yakin Menghapus Card "{card.title}"</h3>
                                            <div className="modal-action">
                                                <form method="dialog">
                                                    <button className="btn btn-success text-white">Close</button>
                                                </form>
                                                <button className='btn btn-error text-white' onClick={() => handleDeleteCard(card)}>Delete</button>
                                            </div>
                                        </div>
                                    </dialog>
                                    {/* END DELETE CARD */}

                                    <h2 className="card-title">{card.title}</h2>
                                    {/* <p>{card.description}</p> */}
                                    <div className="card-actions justify-center">
                                        <button className="btn mt-3" onClick={()=>{
                                            document.getElementById('modalDetailCard_'+card.card_id).showModal()
                                            decrypt(card.description, card.image)
                                        }}>open modal</button>

                                        {/* DETAIL CARD */}
                                        <dialog id={"modalDetailCard_" + card.card_id} className="modal">
                                            <div className="modal-box">
                                                <div className='flex gap-2 border-b-2 my-2 border-black'>
                                                    <h3 className="font-bold text-2xl ps-2">{card.title}</h3>
                                                    <span className='self-center text-2xl text-gray-400'>| {card.job.name_job}</span>
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <img src={'http://localhost:8000/storage/'+(!image ? 'cards/noImage.jpg': image)} alt={(!card.image ? 'tidak ada gambar' : card.image)}/>

                                                    <div className=''>
                                                        <p className='text-2xl font-bold border-b-2'>Description</p>
                                                        <p className="">{description}</p>
                                                    </div>

                                                </div>
                                                <div className="modal-action">
                                                    <form method="dialog">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <button className="btn">Close</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </dialog>
                                        {/* END DETAIL CARD */}
                                    </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </AuthenticatedLayout>
    );
}
