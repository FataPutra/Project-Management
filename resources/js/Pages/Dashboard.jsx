import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={'Dashboard'}
        >
            <Head title="Dashboard" />


            {/* Content */}
            <div className='py-5 px-5 h-full bg-orange-50'>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo eaque minima dolorum nulla! Et, voluptate mollitia culpa dicta repudiandae cupiditate officia voluptatum impedit ea accusantium iste nostrum quas porro reprehenderit quaerat a at enim vel maxime praesentium deleniti aliquam iusto? Perferendis ipsa recusandae iusto? Veritatis delectus aliquid quaerat sint recusandae.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et labore optio officia eos sed nostrum omnis explicabo, facilis possimus minima accusantium velit itaque sequi recusandae culpa totam pariatur aspernatur libero, deleniti vel natus accusamus voluptatem? Quidem saepe itaque vel recusandae pariatur. Mollitia temporibus culpa, cumque eveniet inventore reiciendis atque esse quis harum eum, corrupti nobis impedit voluptas ab totam nulla, dolorem nihil tempora iure. Pariatur veritatis dolor harum est distinctio laudantium labore, adipisci earum nesciunt, aliquam deleniti ipsam minima omnis repudiandae eius consequatur voluptatem cupiditate quia voluptate, tenetur quam at saepe non! Aspernatur soluta tempore ab. Eos quas est nam.</p>
            </div>

        </AuthenticatedLayout>
    );
}
