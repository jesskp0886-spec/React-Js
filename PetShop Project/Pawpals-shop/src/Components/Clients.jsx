import { useState } from 'react'
import './Clients.css'

const testimonials = [
    {
        name: 'Richard Scott',
        role: 'Pet Owner',
        text:
            'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.',
        slot: 'client-1',
    },
    {
        name: 'Amanda Lee',
        role: 'Dog Parent',
        text:
            'The team took wonderful care of my puppy. Friendly staff, clean facility, and my dog loves coming here every single time.',
        slot: 'client-2',
    },
    {
        name: 'James Cooper',
        role: 'Cat Owner',
        text:
            'Professional, caring and always on time. I trust them completely with my pet\'s health and grooming needs.',
        slot: 'client-3',
    },
]

function getInitials(name) {

    return name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
}

function Clients() {
    const [active, setActive] = useState(0)
    const current = testimonials[active]

    return (
        <section className="clients section">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">Testimonials</span>
                    <h2 className="section-title">What Our Clients Say</h2>
                </div>

                <div className="clients__card">
                    <div className="clients__avatar">
                        {getInitials(current.name)}
                    </div>
                    <p className="clients__text">&ldquo;{current.text}&rdquo;</p>
                    <h4 className="clients__name">{current.name}</h4>
                    <span className="clients__role">{current.role}</span>

                    <div className="clients__dots">
                        {testimonials.map((t, i) => (
                            <button
                                key={t.slot}
                                className={`clients__dot ${i === active ? 'is-active' : ''}`}
                                onClick={() => setActive(i)}
                                aria-label={`Show testimonial ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Clients;
