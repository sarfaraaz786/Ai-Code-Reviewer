import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import 'prismjs/themes/prism-tomorrow.css'

import EditorModule from "react-simple-code-editor"
const Editor = EditorModule.default || EditorModule

import prism from 'prismjs'
import "prismjs/components/prism-javascript"
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import "highlight.js/styles/github-dark.css"
import '../style/Aireview.scss'
import { useReview } from '../hook/useReview.js'
import { useAuth } from '../../auth/hook/useAuth.js'

const Aireview = () => {
    const [code, setCode] = useState(` function sum() {
        return 1 + 1
        }`)

    const [review, setReview] = useState('')
    const { getReview } = useReview()

    // Check if user is logged in
    const { user, loading } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        prism.highlightAll()
    })

    async function reviewCode() {
        // If not logged in, send them to login and tell it to come back here
        if (!user) {
            navigate('/login?redirect=/')
            return
        }

        try {
            const response = await getReview(code)
            setReview(response)
        } catch (error) {
            console.log("Review Error:", error)
        }
    }

    // While checking login status, show nothing (or could show a loader)
    if (loading) {
        return <div style={{ color: 'white', padding: '2rem' }}>Loading...</div>
    }

    return (
        <main>
            <div className="left">
                <div className="code">
                    <Editor
                        value={code}
                        onValueChange={code => setCode(code)}
                        highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
                        padding={10}
                        style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 16,
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                            height: "100%",
                            width: "100%"
                        }}
                    />
                </div>
                <div
                    className="review"
                    onClick={reviewCode}
                >Review</div>
            </div>
            <div className="right">
                <Markdown
                    rehypePlugins={[rehypeHighlight]}
                >{review}</Markdown>
            </div>
        </main>
    )
}

export default Aireview
