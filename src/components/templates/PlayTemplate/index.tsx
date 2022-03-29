import ReactLoading from 'react-loading';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Card } from '../../organisms/Card';
import { Input } from '../../atoms/Forms/Input';
import { Button } from '../../atoms/Button';
import { Select } from '../../atoms/Forms/Select';

import styles from './styles.module.scss';

type Category = {
  id: number;
  name: string;
};

type RoundPayload = {
  player_name: string;
  category_id: number;
};

type PlayTemplateProps = {
  categories: Category[];
  loading: boolean;
  onSubmit: SubmitHandler<RoundPayload>;
};

const schema = Yup.object().shape({
  player_name: Yup.string().required('Insira seu nome'),
  category_id: Yup.number().required('Escolha uma categoria'),
});

export function PlayTemplate({
  categories,
  loading,
  onSubmit,
}: PlayTemplateProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      player_name: '',
      category_id: categories[0]?.id,
    },
  });

  return (
    <main className={styles.playTemplate}>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formQuiz}>
          <Input
            type="text"
            placeholder="Jogador"
            error={errors.player_name}
            {...register('player_name')}
          />

          <Select
            placeholder="Categoria"
            {...register('category_id')}
            disabled={!categories}
          >
            {categories?.length > 0 &&
              categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </Select>

          <Button type="submit" disabled={loading}>
            {loading ? (
              <ReactLoading type="cylon" color="#fff" width={42} height={42} />
            ) : (
              'Jogar'
            )}
          </Button>
        </form>
      </Card>
    </main>
  );
}
