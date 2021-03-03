import * as S from './styles'

const Header = ({ goBack = false, title, openForm = false }) => (
  <S.Wrapper>
    {goBack && <S.HeaderButton onClick={goBack}>{'< go Back'}</S.HeaderButton>}
    <S.Title>{title}</S.Title>
    {openForm && <S.HeaderButton onClick={openForm}>+ Add New</S.HeaderButton>}
  </S.Wrapper>
)

export default Header
