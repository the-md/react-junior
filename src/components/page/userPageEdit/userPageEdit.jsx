import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";

const UserPageEdit = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "male",
    qualities: {}
  });
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState();

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfessions(data);
    });
    api.qualities.fetchAll().then((data) => {
      setQualities(data);
      setIsLoading(true);
    });
  }, []);
  useEffect(() => {
    console.log(professions);
  }, [professions, qualities]);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    // name: {
    //   isRequired: { message: "Введите имя" }
    // },
    email: {
      isRequired: { message: "Электронная почта обязательно для заполнения" },
      isEmail: { message: "Электронная почта введена не корректно" }
    }
  };

  useEffect(() => {
    api.users.getById(userId).then((data) => {
      setData({
        name: data.name ? data.name : "",
        email: data.email ? data.email : "",
        profession: data.profession ? data.profession._id : "",
        sex: data.sex ? data.sex : "male",
        qualities: data.qualities ? data.qualities : ""
      });
    });
  }, []);

  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    if (typeof data.profession === "string") {
      data.profession = Object.values(professions).filter(
        (item) => item._id === data.profession
      )[0];
    }
    if (data.qualities) {
      const newArrQual = [];
      data.qualities.forEach((item) => {
        const el = Object.values(qualities).filter(
          (itemQual) => itemQual._id === item.value
        )[0];
        newArrQual.push(el);
      });
      data.qualities = newArrQual;
    }
    api.users.update(userId, data);
    history.push(`/users/${userId}`);
  };

  const handleBack = () => {
    history.push(`/users/${userId}`);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              handleBack();
            }}
          >
            <i className="bi bi-backspace"></i> Назад
          </button>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            {isLoading ? (
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <SelectField
                  label="Select profession"
                  defaultOption="Choose..."
                  options={professions}
                  value={data.profession}
                  onChange={handleChange}
                />
                <RadioField
                  options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" }
                  ]}
                  value={data.sex}
                  name="sex"
                  onChange={handleChange}
                  label="Select sex"
                />
                {console.log("qualities", data.qualities)}
                <MultiSelectField
                  isMulti
                  defaultValue={data.qualities}
                  options={qualities}
                  onChange={handleChange}
                  name="qualities"
                  label="Select qualities"
                />
                <button
                  type="submit"
                  disabled={!isValid}
                  className="btn btn-primary w-100 mx-auto"
                >
                  Update
                </button>
              </form>
            ) : (
              "loading"
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPageEdit;
