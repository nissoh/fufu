import { constant, map, merge, now, snapshot, tap } from "@most/core"
import { $text, Behavior, component, ContainerDomNode, event, state, style } from "fufu"
import { $row } from "../../common/common"
import $Button from "../form/$Button"
import $Input from "../form/$Input"
import { $form } from "../form/form.common"

let iid = 0

export interface Todo {
    id: number,
    text: string,
    completed: boolean,
}

export function createTodo(text: string): Todo {
    return {
        id: iid++,
        text,
        completed: false
    }
}


export default component((
    [sampleSubmit, submit]: Behavior<ContainerDomNode<HTMLFormElement>, Event>
) => {

    const [sampleInput, input] = state<string, string>('')

    const submitBehavior = sampleSubmit(
        event('submit'),
        tap(ev => {
            // prevents form from directing to non-existing location
            ev.preventDefault()
        })
    )

    const add = snapshot(
        createTodo,
        input,
        submit
    )

    const resetOnAdd = constant('', merge(add, now(null)))

    return [
        $form(submitBehavior, style({ marginBottom: '10px' }))(
            $row(
                $Input({ setValue: resetOnAdd })({
                    value: sampleInput()
                }),
                $Button({
                    $content: $text('add'),
                    disabled: map(x => !Boolean(x), merge(input, resetOnAdd))
                })({})
            )
        ),
        {
            add,
            // input
        }
    ]

})