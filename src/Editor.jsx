import './styles.scss'

import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import Collaboration from '@tiptap/extension-collaboration'
import * as Y from 'yjs' // Import Yjs for collaborative editing
import React, { useEffect, useState  } from 'react'

// Importing the provider
//import { TiptapCollabProvider } from '@hocuspocus/provider'
import { HocuspocusProvider } from '@hocuspocus/provider'

// Initialize Y.Doc for shared editing
const doc = new Y.Doc()

const Editor = ({ token }) => {
  // Initialize Tiptap editor with required extensions
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Collaboration.configure({
        document: doc, // Attach the Y.Doc instance for collaboration
      }),
    ],
    content: `
      <p>
        This is a radically reduced version of Tiptap. It has support for a document, with paragraphs and text. Thats it.  probably too much for real minimalists though.
      </p>
      <p>
        The paragraph extension is not really required, but you need at least one node. Sure, that node can be something different.
      </p>
    `,
  })

  // Set up the collaboration provider with the document
  useEffect(() => {
    if (!token) return;
    const provider = new HocuspocusProvider({
      //name: 'example-doc-app', // Unique document identifier for syncing
      //appId: 'e97r3yvm', // Your Cloud Dashboard AppID
      //token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzI2MTA4OTUsIm5iZiI6MTczMjYxMDg5NSwiZXhwIjoxNzMyNjk3Mjk1LCJpc3MiOiJodHRwczovL2Nsb3VkLnRpcHRhcC5kZXYiLCJhdWQiOiJlOTdyM3l2bSJ9.oJhN4SsfjSVIi3w1RKtCa--w_ejhs-czDKDArHTc-uc', // Your JWT token
      //document: doc, // Shared Y.Doc for collaboration
      name: 'example-doc',
      url: 'ws://localhost:1234',
      token: '9ea980d94b63e3931fc5badbb42e71ff66243297263dae8bc6dc4c4598c14733',// Pass the JWT token '9ea980d94b63e3931fc5badbb42e71ff66243297263dae8bc6dc4c4598c14733',
      document: doc,
    })

    // Cleanup provider when component unmounts
    return () => {
      provider.destroy()
    }
  }, [token]) // Empty dependency array ensures this effect runs only once

  return (
    <div className="tiptap-editor">
      <EditorContent editor={editor} />
    </div>
  )
}

export default Editor
