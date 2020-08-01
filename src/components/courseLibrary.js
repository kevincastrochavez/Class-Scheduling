import React, { Component } from 'react';
import { connect, dispatch } from 'react-redux';
import { fetchCourses } from '../actions';

class CourseLibrary extends Component {
    constructor(props) {
        super(props);

        this.renderCourse = this.renderCourse.bind(this);
    }

    componentDidMount() {
        this.props.fetchCourses()
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

function mapDispatchToProps(dispatch) {
    return {
        fetchCourses: () => {
            dispatch(fetchCourses())
        }
    }
}

CourseLibrary = connect(mapStateToProps, mapDispatchToProps)(CourseLibrary);

export default CourseLibrary;