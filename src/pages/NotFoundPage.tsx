import { useNavigate } from "react-router-dom"
import { Button } from "../components/UI/Button"

export function NotFoundPage() {
  const navigate = useNavigate()

  const goBackPage = () => {
    navigate(-1) // TODO: проверить, если нет страницы назад, то перейти на главную
  }
  return (
    <div className="flex items-center  flex-col h-[100vh] tracking-widest bg-white">
      <div className="relative mb-12">
        <h1 className="font-thin text-[240px] h-[273px]">OOPS!</h1>
        <p className="bg-white absolute bottom-0 left-[10%] right-[10%] text-center text-3xl">
          404 - THE PAGE CAN`T BE FOUND
        </p>
      </div>
      <Button onClick={goBackPage} className="py-4">GO BACK PAGE</Button>
    </div>
  )
}
