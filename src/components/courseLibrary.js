import React, { Component } from 'react';
import { connect, dispatch } from 'react-redux';
import { 
    fetchCourses, 
    addCourse, 
    removeCourse, 
    toggleDescription 
} from '../actions';
import AnimateHeight from 'react-animate-height';

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
            <li key={course.title} className={`course ${course.open ? 'course__selected' : ''}`}>
                <div className="course__info">
                    <div className="course__title-container">
                        <div className="course__title">{course.title}</div>

                        <div className={`course__checkmark ${course.enrolled ? 'show-content-fade' : 'hide-content-fade'}`}></div>
                    </div>

                    <a 
                        className={`course__arrow ${course.open ? '' : 'course__arrow-close'}`} 
                        onClick={() => this.props.toggleDescription(course)}>
                    </a>

                    <a 
                        className={`course__add action ${course.enrolled ? 'course__remove' : 'course__add'}`} 
                        onClick={() => course.enrolled ? 
                            this.props.removeCourse(course) 
                            : 
                            this.props.addCourse(course)}
                        >
                    </a>
                </div>

                <AnimateHeight
                    duration={300}
                    height={ course.open ? 'auto' : '0' }
                >
                    <div className="course__description">
                        <h6 className="course__description-title">Course Description</h6>

                        <p>{course.description}</p>
                    </div>
                </AnimateHeight>
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
        },
        addCourse: (course) => {
            dispatch(addCourse(course))
        },
        removeCourse: (course) => {
            dispatch(removeCourse(course))
        },
        toggleDescription: (course) => {
            dispatch(toggleDescription(course))
        }
    }
}

CourseLibrary = connect(mapStateToProps, mapDispatchToProps)(CourseLibrary);

export default CourseLibrary;