import React, { Component } from 'react';
import { connect } from 'react-redux';

class CourseLibrary extends Component {
    constructor(props) {
        super(props);

        this.renderCourse = this.renderCourse.bind(this);
    }

    renderCourse(course) {
        return (
            <li key={course.title} className="course">
                <div className="course__info">
                    <div className="course__title-container">
                        <div className="course__title">{course.title}</div>
                    </div>
                </div>

                <div className="course__description">
                    <h6 className="course__description-title">Course Description</h6>

                    <p>{course.description}</p>
                </div>
            </li>
        )
    }
    
    render() {
        return (
            <ul>
                {this.props.courses.map(this.renderCourse)}
            </ul>
        );
    };
}

function mapStateToProps(state) {
    return { courses: state.courses }
}

CourseLibrary = connect(mapStateToProps)(CourseLibrary);

export default CourseLibrary;