import React from 'react'

const AboutUs = () => {
  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h3 className="card-title text-center">Mid Day Meal Scheme (PM-POSHAN)</h3>
          <p className="card-text">
            The Mid Day Meal Scheme is a school meal programme in India designed to 
            better the nutritional status of school-age children nationwide. The scheme 
            has been renamed as <strong>PM-POSHAN Scheme</strong>.
          </p>
          
          <p className="card-text">
            The programme supplies free lunches on working days for children in government 
            primary and upper primary schools, government-aided Anganwadis, Madarsa, and Maqtabs. 
            Serving <strong>120 million children</strong> in over <strong>1.27 million schools</strong>, 
            it is the largest of its kind in the world.
          </p>

          <h5>📌 History</h5>
          <p>
            The Mid Day Meal Scheme has been implemented in Puducherry since <strong>1930</strong> 
            under French administration. In independent India, Tamil Nadu pioneered the scheme 
            in the early 1960s under former Chief Minister <strong>K. Kamaraj</strong>. By 2002, 
            it was implemented across all states under orders from the Supreme Court of India.
          </p>

          <h5>📌 Recent Updates</h5>
          <p>
            <strong>Ajay Kumar</strong>, Director of Poshan Abhiyaan, stated that the scheme was renamed 
            to <strong>PM-POSHAN (Pradhan Mantri Poshan Shakti Nirman)</strong> in <strong>September 2021</strong> 
            by the Ministry of Education. Additionally, <strong>24 lakh pre-primary students</strong> were included 
            in 2022.
          </p>

          <h5>📌 Legal Backing</h5>
          <p>
            Under <strong>Article 24, paragraph 2c</strong> of the <strong>Convention on the Rights of the Child</strong>, 
            India has committed to providing "adequate nutritious food" for children. The scheme is covered under the 
            <strong>National Food Security Act, 2013</strong>, similar to the US National School Lunch Act.
          </p>

          <p className="text-muted text-end">Source: Government Reports & Supreme Court Orders</p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs