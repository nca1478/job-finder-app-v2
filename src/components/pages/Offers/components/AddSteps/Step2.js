// Dependencies
import { useCallback, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

// Custom Dependencies
import { get } from '../../../../../config/api';
import { currenciesList } from '../../../../../data/selectOptions';
import { sortListObjects } from '../../../../../helpers/utils';
import { parseData, parseDataCurrencies } from '../../helpers/parseData';
import { InputForm } from '../InputForm';
import { SelectForm } from '../SelectForm';

export const Step2 = (props) => {
  const { page, handlePrev, handleNext, formValues, setFormValues } = props;
  const [skillsOptions, setSkillsOptions] = useState(null);
  const [currencyOptions, setCurrencyOptions] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const fetchSkills = useCallback(async () => {
    await get('/skills?page=1&take=1000')
      .then(({ data }) => {
        const skills = parseData(data);
        sortListObjects(skills);
        setSkillsOptions(skills);
      })
      .catch((error) => {
        toast.error('Error al intentar obtener habilidades.');
        console.log(error);
      });
  }, []);

  const getCurrencies = useCallback(() => {
    const currencies = parseDataCurrencies(currenciesList);
    setCurrencyOptions(currencies);
  }, []);

  useEffect(() => {
    fetchSkills().catch(console.error);
    getCurrencies();
    reset(formValues);
  }, [fetchSkills, formValues, getCurrencies, reset]);

  const onSubmit = (data) => {
    if (data) {
      setFormValues({ ...formValues, ...data });
      handleNext();
    }
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <Form className="mx-3" onSubmit={handleSubmit(onSubmit)}>
        <SelectForm
          name="skills"
          label="Habilidades"
          controlId="formBasicSkills"
          control={control}
          options={skillsOptions}
          errors={errors.skills}
          isMulti={true}
        />

        <InputForm
          type="number"
          name="price"
          label="Precio"
          placeholder="Ingresa Precio"
          controlId="formBasicPrice"
          register={register}
          errors={errors.price}
        />

        <SelectForm
          name="currency"
          label="Moneda"
          controlId="formBasicCurrency"
          control={control}
          options={currencyOptions}
          errors={errors.currency}
          isMulti={false}
        />

        <div className="d-flex justify-content-between gap-1">
          <Button
            type="button"
            variant="primary"
            className="px-4"
            disabled={page === 0 && 'false'}
            onClick={handlePrev}
          >
            Anterior
          </Button>
          <Button type="submit" variant="primary" className="px-4">
            Siguiente
          </Button>
        </div>
      </Form>
      <ToastContainer />
    </div>
  );
};
