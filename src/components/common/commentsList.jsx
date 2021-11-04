import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Comment from "./comment";
import api from "../../api";
import { validator } from "../../utils/validator";
import SelectFieldUsers from "./form/selectFieldUsers";
import TextAreaField from "./form/textAreaField";

const CommentsList = ({ userId }) => {
    const [data, setData] = useState({
        user: "",
        message: ""
    });
    const [errors, setErrors] = useState({});
    const [comments, setComments] = useState();
    const [users, setUsers] = useState();
    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then((data) => {
            setComments(data);
        });
        api.users.fetchAll().then((data) => {
            setUsers(data);
        });
    }, []);

    const handleDelete = (_id) => {
        api.comments.remove(_id).then((data) => {
            const newComments = comments.filter(
                (comment) => comment._id !== data
            );
            setComments(newComments);
        });
    };
    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const validatorConfig = {
        message: {
            isRequired: {
                message: "Введите сообщение"
            }
        },
        user: {
            isRequired: {
                message: "Обязательно выберите юзера"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmitComment = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newComment = {
            _id: "",
            userId: data.user,
            pageId: userId,
            content: data.message
        };
        api.comments.add(newComment).then((data) => {
            const newComments = comments.concat(data);
            console.log("comments", newComments);
            setComments(newComments);
            setData({ user: "", message: "" });
        });
    };
    let commentsThisPage = [];
    if (comments) {
        commentsThisPage = comments.filter((item) => item.pageId === userId);
        comments.sort((prev, next) => next.created_at - prev.created_at);
    }

    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <form onSubmit={handleSubmitComment}>
                        <h2>New comment</h2>
                        {users && (
                            <SelectFieldUsers
                                label="Select user"
                                defaultOption="Choose..."
                                options={users}
                                value={data.user}
                                onChange={handleChange}
                                error={errors.user}
                            />
                        )}
                        <TextAreaField
                            label="Message"
                            name="message"
                            value={data.message}
                            onChange={handleChange}
                            error={errors.message}
                        />
                        <div className="mb-4">
                            <button
                                className="btn btn-primary"
                                type="submit"
                                disabled={!isValid}
                            >
                                Опубликовать
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {commentsThisPage.length !== 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />

                        {comments.map((comment) => (
                            <Comment
                                key={comment._id}
                                {...comment}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
CommentsList.propTypes = {
    userId: PropTypes.string
};

export default CommentsList;
