const SubjectList = ({ subjects }) => {
	return (
		<div className="mt-10">
			<h1 className="text-4xl font-bold">Courses List</h1>
			<ul className="flex flex-row gap-6 mt-5">
				{subjects.map((subject, index) => (
					<li key={index} className="card w-96 bg-primary text-primary-content">
						<div className="card-body">
							<h2 className="card-title">{subject.title}</h2>
							<p>{subject.desc}</p>
							<div className="card-actions justify-start">
								<button className="btn">Explore</button>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default SubjectList;
